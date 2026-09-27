This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the homepage by modifying `app/page.jsx`. The page auto-updates as you edit the file.

Use `npm run dev` (webpack), not `next dev --turbopack`; Turbopack in this Next version breaks on the Google fonts used in `app/layout.jsx`.

## Calendar events

Calendar entries live in `data/calendar-events.json`. Dates use `YYYY-MM-DD`, and optional start/end times use 24-hour `HH:mm` values. An event can omit its time and location when those details have not been announced yet.

After updating the file, deploy the site (see below); no database or calendar API is required.

## Exec page

Exec profiles live in `app/exec/page.tsx`. Photos go in `public/images/exec/` and are cropped to a square on the card, so head-and-shoulders portraits work best. If a face sits too high or low, add a `photo_position` (e.g. `"50% 30%"`) to that person's entry instead of editing the image.

## Deploying

**Pushing to GitHub does not update the live site.** The site is a static export: `npm run build` produces plain HTML/CSS/JS in `out/`, and that folder is copied to whatever web server hosts the domain. Any static host works (MIT Scripts, GitHub Pages, Netlify, an S3 bucket, ...); there is no server-side code.

### 1. Build

```bash
npm run build
```

Everything the site needs is now in `out/`. This folder is git-ignored, so always rebuild rather than reusing an old copy.

### 2. Upload `out/` to the web root

Copy the *contents* of `out/` into the directory the web server serves for the domain. With `rsync` over SSH:

```bash
rsync -av --delete out/ USER@HOST:/path/to/web/root/
```

- The trailing slash on `out/` matters: it copies the contents, not the folder itself.
- `--delete` removes files from previous builds so old JS chunks don't accumulate. Drop it if the web root contains files that are not part of this site.
- If the host has an `.htaccess` or other server config file in the web root, add `--exclude .htaccess` so it isn't removed.

There is no build step on the server. Once the copy finishes, hard-refresh the site (Cmd+Shift+R) to see the change.

### Finding the right web root (MIT Scripts)

[asians.mit.edu](https://asians.mit.edu) is currently hosted on [MIT Scripts](https://scripts.mit.edu). Scripts serves each locker from `/mit/LOCKER/web_scripts/`, and a custom hostname can point at a locker **or at a subfolder inside it**. Uploading to the wrong folder will succeed silently and change nothing on the live site, so confirm the path first:

- Log in to [Pony](https://pony.scripts.mit.edu/) (Scripts' hostname manager) with your MIT certificate. It lists every hostname for lockers you can access and the exact directory each one serves.
- Or SSH in and look: `ssh USER@athena.dialup.mit.edu 'ls -la /mit/LOCKER/web_scripts/'`. The live site's files carry the date of the last upload.

Then use that directory as the destination in the `rsync` command above, e.g. `USER@athena.dialup.mit.edu:/mit/LOCKER/web_scripts/SUBFOLDER/`. Athena logins prompt for your Kerberos password and Duo.

You need write access to that locker. If you don't have it, an existing member with access can grant it from Athena with `fs sa /mit/LOCKER/web_scripts USER rlidwk` (repeat for the subfolder if there is one).

### Other notes

- A Vercel project is also connected to this GitHub repo and auto-deploys on push, but it is private (Vercel login required) and no domain points at it. It is useful as a build check, not as the live site. To switch hosting to Vercel instead, disable Vercel Authentication on the project, add the domain there, and have IS&T point the hostname's DNS at Vercel.
- Because the export has no server, anything under `app/api/` fails the build. Forms should link out (e.g. Google Forms) rather than post to an API route.
- If `npm run build` fails inside `next/font/google`, it is usually an older Next version that can't parse Google's current font URLs. Upgrading `next` (and `eslint-config-next`) to the latest patch release fixes it.
