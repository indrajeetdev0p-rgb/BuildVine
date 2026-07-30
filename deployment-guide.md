# Deployment Guide: BuildHub

Your application is fully polished and ready for production! 
To deploy this application to the world, you just need to follow these 3 steps:

## Step 1: Push to GitHub 🐙
First, we need to push your local codebase to a GitHub repository so that Vercel can access it.
1. Go to [GitHub](https://github.com/new) and create a new repository called `buildhub`.
2. Open your terminal in the project folder and run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Ready for production"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/buildhub.git
   git push -u origin main
   ```

## Step 2: Deploy the Database (Turso) 🗄️
Since you're using SQLite with LibSQL/Prisma, **Turso** is the absolute best serverless database host.
1. Go to [Turso](https://turso.tech/) and create an account.
2. In your terminal, install the Turso CLI:
   ```bash
   npm install -g @tursodatabase/boss
   ```
3. Login and create a new database:
   ```bash
   turso auth login
   turso db create buildhub-db
   ```
4. Get your connection URL and Auth Token:
   ```bash
   turso db show buildhub-db --url
   turso db tokens create buildhub-db
   ```
5. Keep these handy! You will need them for Vercel.

## Step 3: Deploy to Vercel ▲
1. Go to [Vercel](https://vercel.com/new) and import your `buildhub` GitHub repository.
2. Open the **Environment Variables** section before deploying.
3. Add the following variables (refer to your `.env.example` file):
   - `DATABASE_URL` (Your Turso URL, starting with `libsql://`)
   - `DATABASE_AUTH_TOKEN` (Your Turso Token)
   - `BETTER_AUTH_SECRET` (Run `npx auth secret` in your terminal to generate one)
   - `BETTER_AUTH_URL` (Set this to your vercel deployment URL once it's created, e.g., `https://buildhub.vercel.app`)
   - `GITHUB_CLIENT_ID` & `GITHUB_CLIENT_SECRET`
   - `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`
4. Click **Deploy**!

> [!TIP]
> After Vercel deploys, make sure to go to your GitHub/Google OAuth settings and add your new `https://buildhub.vercel.app/api/auth/callback/...` URLs to the authorized callback list!
