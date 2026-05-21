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

This is a standard static-export Next.js app for CloudBase Static Website Hosting. It does not require a database, server API routes, Supabase, login, or authentication.

## Deploy with GitHub and Vercel

1. Create a new GitHub repository.
2. Push this project to the repository.
3. Open [Vercel](https://vercel.com), choose **Add New Project**, and import the GitHub repository.
4. Keep Vercel's default Next.js settings:
   - Framework Preset: `Next.js`
   - Build Command: `npm run build`
   - Install Command: `npm install`
   - Output Directory: leave blank / unspecified
5. Click **Deploy**.
6. After deployment finishes, open the Vercel project URL.

Vercel will rebuild automatically whenever changes are pushed to the connected GitHub branch.

If Vercel shows an Output Directory value such as `public`, remove it. This project is a standard Next.js app and should use Vercel's default Next.js output.

## Deploy to Tencent CloudBase Hosting

This project is configured for Tencent CloudBase Static Website Hosting with Next.js static export. Running `npm run build` generates the `./out` directory that CloudBase should deploy.

### Option 1: Git repository deployment

1. Push this project to GitHub, GitLab, Gitee, or Tencent Coding.
2. Open the Tencent CloudBase console and enter **Static Website Hosting**.
3. Create a new deployment and choose **Git repository**.
4. Select this repository and branch.
5. Use these build settings:
   - Framework: `Next.js`
   - Install Command: `npm install`
   - Build Command: `npm run build`
   - Build Output Directory: `./out`
   - Deploy Path: `/`
6. Start the deployment and open the generated CloudBase domain after it completes.

### Option 2: CloudBase CLI deployment

```bash
npm i -g @cloudbase/cli
tcb login
tcb app deploy --framework next --output-dir ./out -e <your-env-id>
```

Replace `<your-env-id>` with your CloudBase environment ID.

Notes:

- Do not set the output directory to `public`.
- Do not add CloudBase Database, Cloud Functions, login, authentication, or Supabase for this version.
- Workout records are still stored with browser `localStorage`, so records stay on the device/browser where the app is used.

## Open on iPhone

1. Open the deployed Vercel link in iPhone Safari.
2. Tap the Safari share button.
3. Choose **Add to Home Screen**.
4. Confirm the name and tap **Add**.

The app will open from the Home Screen like a lightweight diary app. Records are stored in that browser on that device.
