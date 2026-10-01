import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // MIT Scripts 403s Next's RSC .txt files, so internal nav uses <a> for full HTML loads.
      "@next/next/no-html-link-for-pages": "off",
    },
  },
];

export default eslintConfig;
