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

## Calendar events

Calendar entries live in `data/calendar-events.json`. Dates use `YYYY-MM-DD`, and optional start/end times use 24-hour `HH:mm` values. An event can omit its time and location when those details have not been announced yet.

After updating the file, deploy the site as usual; no database or calendar API is required.

## This is deployed at [https://asians.mit.edu](https://asians.mit.edu).
