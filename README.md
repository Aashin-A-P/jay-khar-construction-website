# Jay-Khar Construction

Vercel-native rebuild of the Jay-Khar Construction website.

## Stack

- Frontend and backend: Next.js App Router, React, TypeScript
- Styling: Tailwind CSS
- Icons: Lucide React
- Serverless API: Next.js route handlers under `/api`
- Email: Nodemailer SMTP
- Storage: Static project data and email-only submissions, no database

## Local Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the environment file:

   ```bash
   copy .env.local.example .env.local
   ```

3. Configure SMTP in `.env.local` if you want form submissions to send email.

   ```txt
   MAIL_TO=jay_khar@yahoo.com
   MAIL_FROM=no-reply@jaykharconstruction.com
   MAIL_ENABLED=true
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=tls
   SMTP_USERNAME=your-smtp-user
   SMTP_PASSWORD=your-smtp-password
   ```

4. Start the app:

   ```bash
   npm run dev
   ```

The website and API are served from the same Next.js app. Contact and career submissions are sent directly by email and are not stored in a database.

## Vercel Deployment

Use the repository root as the Vercel project root.

- Build command: `npm run build`
- Install command: `npm install`
- Output: handled automatically by Next.js

Add the same mail variables from `.env.local.example` in Vercel Project Settings > Environment Variables.

## Legacy Folders

The old `frontend/` Vite app and `backend/` PHP API remain in the repository for reference during migration. The root Next.js app is now the deployment target.
# jay-khar-construction-website
Construction Company Website
