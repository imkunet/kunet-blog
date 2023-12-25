import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";

import macchiato from "./macchiato.json";

// https://astro.build/config

export default defineConfig({
  prefetch: true,
  integrations: [
    tailwind(),
    mdx({
      syntaxHighlight: "shiki",
      shikiConfig: { theme: macchiato },
    }),
  ],
});
