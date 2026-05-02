# GitHub Actions CI/CD Setup Guide

This project includes two GitHub Actions workflows for continuous integration and deployment.

## Workflows Overview

### 1. **CI Workflow** (`.github/workflows/ci.yml`)
Runs on every push and pull request to `main` or `develop` branches.

**What it does:**
- ✅ Installs dependencies
- ✅ Runs ESLint (linter)
- ✅ Builds the Next.js project
- ✅ Tests Node.js versions 18.x and 20.x

**Triggers:**
- Push to `main` or `develop`
- Pull requests targeting `main` or `develop`

---

### 2. **Deploy Workflow** (`.github/workflows/deploy.yml`)
Automatically deploys to Vercel when code is pushed to `main`.

**What it does:**
- ✅ Installs dependencies
- ✅ Builds the project
- ✅ Deploys production build to Vercel

**Triggers:**
- Push to `main` branch only

---

## Setup Instructions

### Step 1: Create GitHub Repository Secrets

To deploy to Vercel, you need to add GitHub secrets. Go to your repository:

1. Click **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret** and add these three secrets:

#### `VERCEL_TOKEN`
- Go to [Vercel Dashboard](https://vercel.com/account/tokens)
- Click **Create Token**
- Copy the token value
- Add as secret `VERCEL_TOKEN`

#### `VERCEL_ORG_ID`
- Go to [Vercel Account Settings](https://vercel.com/account)
- Find your **Team ID** (or use Personal Account ID)
- Add as secret `VERCEL_ORG_ID`

#### `VERCEL_PROJECT_ID`
- In [Vercel Dashboard](https://vercel.com/dashboard), select your project
- Click **Settings** → **General**
- Copy the **Project ID**
- Add as secret `VERCEL_PROJECT_ID`

### Step 2: Commit and Push

```bash
git add .
git commit -m "Add GitHub Actions CI/CD workflows"
git push origin main
```

### Step 3: Monitor Workflows

1. Go to your GitHub repository
2. Click **Actions** tab
3. You'll see your workflows running

---

## Workflow Status Badges

Add these to your README.md to display CI/CD status:

```markdown
[![CI](https://github.com/YOUR_USERNAME/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/YOUR_USERNAME/portfolio/actions/workflows/ci.yml)
[![Deploy](https://github.com/YOUR_USERNAME/portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/YOUR_USERNAME/portfolio/actions/workflows/deploy.yml)
```

Replace `YOUR_USERNAME` with your actual GitHub username.

---

## Local Testing

You can test workflows locally using [act](https://github.com/nektos/act):

```bash
# Install act
npm install -g act

# Run CI workflow
act push -j build-and-test

# Run deploy workflow
act push -j deploy
```

---

## Troubleshooting

### Build fails but works locally
- Check Node version compatibility (workflows test 18.x and 20.x)
- Ensure all dependencies are listed in `package.json`
- Check for environment-specific code

### Deploy doesn't work
- Verify all three Vercel secrets are set correctly
- Check Vercel project exists and is linked
- View full logs in Actions tab for specific errors

### Linter warnings appear
- The CI workflow is set to `continue-on-error: true` for linting
- To fail on linting errors, edit `.github/workflows/ci.yml`:
  ```yml
  - name: Run linter
    run: npm run lint
    # remove 'continue-on-error: true' to fail on warnings
  ```

---

## Customization

### Change trigger branches
Edit the workflow files to match your branch strategy:
```yml
on:
  push:
    branches: [main, staging]
  pull_request:
    branches: [main, staging]
```

### Add environment variables
In workflow files, add an `env` section:
```yml
env:
  NODE_ENV: production
```

### Add more checks
Add additional steps before the build:
```yml
- name: Run tests
  run: npm test

- name: Check types
  run: npx tsc --noEmit
```

---

## Next Steps

1. ✅ Set up the three Vercel secrets
2. ✅ Commit the workflow files
3. ✅ Monitor your first CI/CD run
4. ✅ Add status badges to README
5. ✅ Customize workflows as needed

For more info:
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel GitHub Integration](https://vercel.com/docs/git/github)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
