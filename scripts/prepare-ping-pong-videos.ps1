param([string]$FFmpegPath = 'ffmpeg')

$ErrorActionPreference = 'Stop'
$encoderCommand = Get-Command $FFmpegPath -ErrorAction SilentlyContinue
if (-not $encoderCommand) {
  throw 'FFmpeg is required. Pass -FFmpegPath with the path to an existing ffmpeg.exe.'
}
$encoderPath = $encoderCommand.Source
$projectDirectory = Split-Path -Parent $PSScriptRoot
$publicDirectory = [System.IO.Path]::GetFullPath((Join-Path $projectDirectory 'public'))

foreach ($dataFile in Get-ChildItem -LiteralPath (Join-Path $projectDirectory 'data/work') -Filter '*.json') {
  $workData = Get-Content -LiteralPath $dataFile.FullName -Raw | ConvertFrom-Json
  $changed = $false

  foreach ($section in $workData.bentoSections) {
    foreach ($item in $section.items) {
      if ($item.media.type -ne 'video' -or -not $item.media.src) { continue }
      if ($item.media.src -match '-ping-pong\.mp4$') { continue }

      $inputPath = [System.IO.Path]::GetFullPath((Join-Path $publicDirectory $item.media.src.TrimStart('/')))
      if (-not $inputPath.StartsWith($publicDirectory + [System.IO.Path]::DirectorySeparatorChar, [System.StringComparison]::OrdinalIgnoreCase)) {
        throw ('Only local videos inside public/ are supported: ' + $item.media.src)
      }
      if (-not (Test-Path -LiteralPath $inputPath -PathType Leaf)) { throw ('Missing video: ' + $inputPath) }

      $outputName = [System.IO.Path]::GetFileNameWithoutExtension($inputPath) + '-ping-pong.mp4'
      $outputPath = Join-Path (Split-Path -Parent $inputPath) $outputName
      if (Test-Path -LiteralPath $outputPath) { throw ('Output already exists: ' + $outputPath) }

      # Count frames at the same rate used for the output, so duplicate end frames
      # can be removed at both the turnaround and the loop boundary.
      $progress = & $encoderPath -v error -nostats -i $inputPath -map '0:v:0' -vf 'fps=30' -an -progress 'pipe:1' -f null NUL
      if ($LASTEXITCODE -ne 0) { throw ('Unable to read video: ' + $inputPath) }
      $frameLines = @($progress | Where-Object { $_ -match '^frame=\d+$' })
      $frameCount = [int]($frameLines[-1] -replace '^frame=', '')
      if ($frameCount -lt 3) { throw ('Video must contain at least three frames: ' + $inputPath) }
      $reverseEnd = $frameCount - 1

      $filter = "[0:v]fps=30,split=2[f][r];[f]setpts=PTS-STARTPTS[forward];[r]reverse,trim=start_frame=1:end_frame=$reverseEnd,setpts=PTS-STARTPTS[backward];[forward][backward]concat=n=2:v=1:a=0[out]"
      & $encoderPath -hide_banner -loglevel error -n -i $inputPath -filter_complex $filter -map '[out]' -an -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p -movflags '+faststart' $outputPath
      if ($LASTEXITCODE -ne 0) { throw ('Unable to encode video: ' + $inputPath) }

      $item.media | Add-Member -NotePropertyName sourceSrc -NotePropertyValue $item.media.src -Force
      $item.media.src = ($item.media.src -replace '[^/]+$', $outputName)
      $changed = $true
      Write-Output ('Created ' + $item.media.src)
    }
  }

  if ($changed) {
    [System.IO.File]::WriteAllText($dataFile.FullName, ($workData | ConvertTo-Json -Depth 10))
  }
}
