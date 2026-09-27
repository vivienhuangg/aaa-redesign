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

### asians.mit.edu (MIT Scripts)

[asians.mit.edu](https://asians.mit.edu) is hosted on [MIT Scripts](https://scripts.mit.edu) and serves from the **`aaa/` subfolder** of the `aaa` locker, i.e. `/mit/aaa/web_scripts/aaa/`. The full deploy is:

```bash
npm run build
rsync -av --delete --exclude .htaccess out/ YOUR_KERB@athena.dialup.mit.edu:/mit/aaa/web_scripts/aaa/
```

Replace `YOUR_KERB` with your Athena username. You'll be prompted for your Kerberos password and Duo. Then hard-refresh the site.

Watch the destination path: the locker root `/mit/aaa/web_scripts/` is **not** the live site (it's what `aaa.scripts.mit.edu` shows), and it also holds old site versions (`aaa_2024`, `aaa_old`, ...). Uploading to the wrong folder succeeds silently and changes nothing on asians.mit.edu.

If the hostname is ever re-pointed, you can confirm the current directory in [Pony](https://pony.scripts.mit.edu/) (Scripts' hostname manager, MIT certificate login), which lists each hostname and the folder it serves, or by SSHing in and running `ls -la /mit/aaa/web_scripts/` to find the folder with the most recent upload date.

You need write access to the locker. An existing member with access can grant it from Athena with `fs sa /mit/aaa/web_scripts YOUR_KERB rlidwk` and `fs sa /mit/aaa/web_scripts/aaa YOUR_KERB rlidwk`.

### Other notes

- A Vercel project is also connected to this GitHub repo and auto-deploys on push, but it is private (Vercel login required) and no domain points at it. It is useful as a build check, not as the live site. To switch hosting to Vercel instead, disable Vercel Authentication on the project, add the domain there, and have IS&T point the hostname's DNS at Vercel.
- Because the export has no server, anything under `app/api/` fails the build. Forms should link out (e.g. Google Forms) rather than post to an API route.
- If `npm run build` fails inside `next/font/google`, it is usually an older Next version that can't parse Google's current font URLs. Upgrading `next` (and `eslint-config-next`) to the latest patch release fixes it.
