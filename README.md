# Little Fitness Diary

A mobile-first fitness diary app built with Next.js, TypeScript, Tailwind CSS, and Recharts. Data is saved in the browser with `localStorage`; there is no backend, login, or authentication.

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Build

```bash
npm run build
```

This is a standard Next.js app deployment. It does not require a database, server API routes, Supabase, login, or authentication.

## Deploy with GitHub and Vercel

1. Create a new GitHub repository.
2. Push this project to the repository.
3. Open [Vercel](https://vercel.com), choose **Add New Project**, and import the GitHub repository.
4. Keep Vercel's default Next.js settings:
   - Framework Preset: `Next.js`
   - Build Command: `npm run build`
   - Output Directory: leave default
   - Install Command: `npm install`
5. Click **Deploy**.
6. After deployment finishes, open the Vercel project URL.

Vercel will rebuild automatically whenever changes are pushed to the connected GitHub branch.

## Open on iPhone

1. Open the deployed Vercel link in iPhone Safari.
2. Tap the Safari share button.
3. Choose **Add to Home Screen**.
4. Confirm the name and tap **Add**.

The app will open from the Home Screen like a lightweight diary app. Records are stored in that browser on that device.
