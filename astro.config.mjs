import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

import macchiato from "./macchiato.json";
import caddyfile from "./caddyfile.tmLanguage.json";

// https://astro.build/config

export default defineConfig({
  prefetch: true,
  site: 'https://blog.kunet.dev',
  integrations: [
    tailwind(),
    mdx({
      syntaxHighlight: "shiki",
      shikiConfig: {
        theme: macchiato,
        langs: [
          {
            id: "caddy",
            scopeName: "source.Caddyfile",
            aliases: ["caddy", "caddyfile"],
            grammar: caddyfile,
          },
          "bash",
          "yaml",
          "zig",
        ],
      },
      remarkPlugins: [remarkMath],
		  rehypePlugins: [rehypeKatex],
    }),
    sitemap(),
  ],
});
