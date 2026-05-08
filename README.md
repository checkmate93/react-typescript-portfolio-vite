
Try it here.    https://checkmate93.github.io/my-shifts-html-programm-page/
# DeployFlow

A production-ready React + TypeScript website built with Vite, Tailwind CSS, React Router, Font Awesome, Framer Motion, and EmailJS.

## Features

- Multi-page SPA routing with React Router.
- Full-bleed landing page hero and responsive sections.
- Font Awesome brand and interface icons.
- EmailJS contact form using Vite environment variables.
- `vercel.json` rewrite so direct route refreshes work on Vercel.

## Local Setup

```bash
npm install
npm run dev
```

## EmailJS Setup

Create an EmailJS service and template, then copy `.env.example` to `.env.local`.

```bash
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Use these template variables in EmailJS: `user_name`, `user_email`, `project_type`, `message`, and `to_name`.

## Deploy To Vercel

1. Push the repository to GitHub.
2. Import the repository in Vercel.
3. Add the three EmailJS variables in Project Settings > Environment Variables.
4. Deploy with the default Vite build command.
