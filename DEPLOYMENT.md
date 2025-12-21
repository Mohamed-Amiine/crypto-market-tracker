# Deploying CryptoPulse to Vercel

This guide walks you through deploying CryptoPulse to Vercel with a Neon PostgreSQL database.

## Prerequisites

- GitHub account
- Vercel account (free tier available at [vercel.com](https://vercel.com))
- Neon Database account (free tier available at [neon.tech](https://neon.tech))

## Step 1: Database Setup (Neon)

### Create Neon Database

1. Go to [neon.tech](https://neon.tech) and sign up/login
2. Click **"Create Project"**
3. Configure your project:
   - **Project Name**: `cryptopulse` (or your preferred name)
   - **Region**: Choose closest to your users
   - **Postgres Version**: Latest stable (default)
4. Click **"Create Project"**

### Get Connection String

1. After creation, you'll see the connection details
2. Copy the **Connection String** (starts with `postgresql://`)
3. It should look like:
   ```
   postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require
   ```
4. **Save this** - you'll need it for Vercel!

### Initialize Database Schema

Run this locally to push the schema to your Neon database:

```bash
# Create .env file with your database URL
echo "DATABASE_URL=your_neon_connection_string_here" > .env

# Push schema to database
npm run db:push
```

## Step 2: Push Code to GitHub

### Initialize Git Repository (if not already)

```bash
git init
git add .
git commit -m "Initial commit - CryptoPulse ready for deployment"
```

### Create GitHub Repository

1. Go to [github.com](https://github.com) and create a new repository
2. Name it `CryptoPulse` (or your preferred name)
3. **Do NOT** initialize with README (we already have one)
4. Click **"Create repository"**

### Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/CryptoPulse.git
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel

### Import Project

1. Go to [vercel.com](https://vercel.com) and login
2. Click **"Add New"** → **"Project"**
3. Click **"Import Git Repository"**
4. Select your `CryptoPulse` repository
5. Click **"Import"**

### Configure Project

Vercel will auto-detect the settings. Verify:

- **Framework Preset**: Vite
- **Root Directory**: `./` (leave default)
- **Build Command**: `npm run build`
- **Output Directory**: `dist/public`

### Add Environment Variables

Click **"Environment Variables"** and add:

1. **DATABASE_URL**
   - Value: Your Neon connection string from Step 1
   - Example: `postgresql://user:pass@ep-xxx.region.aws.neon.tech/neondb?sslmode=require`

2. **SESSION_SECRET**
   - Value: A random secret key
   - Generate one at: [randomkeygen.com](https://randomkeygen.com/)
   - Or use: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

3. **NODE_ENV** (optional)
   - Value: `production`

### Deploy!

1. Click **"Deploy"**
2. Wait for the build to complete (usually 1-2 minutes)
3. Once done, you'll get a production URL like: `https://cryptopulse-xxx.vercel.app`

## Step 4: Verify Deployment

1. Click the production URL
2. The app should load successfully
3. Test features:
   - View cryptocurrency list
   - Check real-time price updates
   - Create a watchlist (if authentication is enabled)
   - View charts

## Post-Deployment

### Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow Vercel's DNS configuration instructions

### Environment Variables Updates

To update environment variables after deployment:

1. Go to Project Settings → Environment Variables
2. Edit or add new variables
3. Redeploy: Deployments → Latest → ⋯ → Redeploy

### Monitoring

- View logs: Deployments → [Your Deployment] → Runtime Logs
- Monitor performance: Analytics tab
- Check errors: Deployment → Details

## Troubleshooting

### Build Fails

**Error: "MODULE_NOT_FOUND"**
- Solution: Ensure all dependencies are in `package.json`
- Run locally: `npm run build` to test

**Error: "DATABASE_URL not found"**
- Solution: Add `DATABASE_URL` in Vercel environment variables
- Verify the connection string is correct

### Runtime Errors

**500 Internal Server Error**
- Check Runtime Logs in Vercel dashboard
- Verify database connection string
- Ensure database schema is pushed (`npm run db:push`)

**Database Connection Timeout**
- Check Neon database is active (free tier may suspend after inactivity)
- Visit Neon dashboard to wake it up

### Environment Variables Not Working

- Ensure variables are added to **Production** environment
- Redeploy after adding variables
- Check for typos in variable names

## Continuous Deployment

Every push to `main` branch will automatically deploy to Vercel!

```bash
# Make changes
git add .
git commit -m "Update feature"
git push

# Vercel automatically builds and deploys ✨
```

## Useful Commands

```bash
# Test production build locally
npm run build
npm start

# Check TypeScript errors
npm run check

# Update database schema
npm run db:push
```

## Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Neon Docs**: [neon.tech/docs](https://neon.tech/docs)
- **Issues**: Open an issue on GitHub

---

🎉 **Congratulations!** Your CryptoPulse app is now live!
