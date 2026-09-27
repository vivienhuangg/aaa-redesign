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

## Deploying to asians.mit.edu

**Pushing to GitHub does not update the live site.** [asians.mit.edu](https://asians.mit.edu) is served by MIT Scripts (Apache) out of the `aaa` locker, so the site is built as a static export and uploaded by hand. (There is also a Vercel project connected to this repo, but it is private and no domain points at it.)

You need an Athena account with write access to the `aaa` locker. If you don't have it, ask a current exec member with access to run `fs sa /mit/aaa/web_scripts YOUR_KERB rlidwk` from Athena.

1. Make sure your changes are committed and pushed to `main` so the repo matches the live site.
2. Build the static site. This writes everything to `out/`:

   ```bash
   npm run build
   ```

3. Upload `out/` into the locker's web root (replace `YOUR_KERB` with your Athena username; it will ask for your Kerberos password and Duo):

   ```bash
   rsync -av --delete --exclude .htaccess out/ YOUR_KERB@athena.dialup.mit.edu:/mit/aaa/web_scripts/
   ```

   `--delete` removes old build files so stale JS chunks don't pile up. Never delete the `.htaccess` file if one exists there.

4. Open [https://asians.mit.edu](https://asians.mit.edu) and hard-refresh (Cmd+Shift+R). Changes are live immediately; there is no build step on the server.

Notes:

- `out/` is git-ignored. Always rebuild before uploading rather than reusing an old folder.
- The export has no server, so anything under `app/api/` will fail the build. Forms should link out (e.g. Google Forms) rather than post to an API route.
- If `npm run build` fails on `next/font/google`, it is usually a stale Next version that can't parse Google's font URLs; upgrading `next` to the latest patch release fixes it.
