import type { NextConfig } from 'next';

// asians.mit.edu is served as static files from MIT Scripts (Apache),
// so the site is built as a static export. `npm run build` writes to `out/`.
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
