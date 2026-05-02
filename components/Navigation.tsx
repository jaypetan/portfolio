import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Navigation() {
  const router = useRouter()

  return (
    <nav className="sticky top-0 z-100 bg-[#0f172a]/95 border-b border-slate-700/20 px-6 py-4 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link 
          href="/" 
          className={`text-2xl font-bold transition-colors ${
            router.pathname === '/' ? 'text-sky-400' : 'text-sky-400 hover:text-sky-500'
          }`}
        >
          Portfolio
        </Link>
        <ul className="flex gap-8 list-none">
          <li>
            <Link 
              href="/" 
              className={`font-medium transition-colors ${
                router.pathname === '/' 
                  ? 'text-sky-400 border-b-2 border-sky-400 pb-1' 
                  : 'text-slate-400 hover:text-sky-400'
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              href="/about" 
              className={`font-medium transition-colors ${
                router.pathname === '/about' 
                  ? 'text-sky-400 border-b-2 border-sky-400 pb-1' 
                  : 'text-slate-400 hover:text-sky-400'
              }`}
            >
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
