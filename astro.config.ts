import type { RehypePlugin } from '@astrojs/markdown-remark';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections';
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';
import tailwindcss from '@tailwindcss/vite';
import expressiveCode, { ExpressiveCodeTheme } from 'astro-expressive-code';
import { defineConfig } from 'astro/config';
import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic';
import fs from 'node:fs';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import remarkMath from 'remark-math';

// one of these days they will allow us to use aliases in this file
import { attribution } from './src/plugins/expressive-code/attribution';
import { curses } from './src/plugins/expressive-code/curses';
import { languageIcons } from './src/plugins/expressive-code/language-icons';
import { rehypeImageText } from './src/plugins/rehype/image-text';
import { remarkReadTime } from './src/plugins/remark/read-time';
import { remarkToc } from './src/plugins/remark/toc';

const generateTheme = (name: string) => {
  const jsoncString = fs.readFileSync(
    new URL(`data/${name}.jsonc`, import.meta.url),
    `utf-8`,
  );
  return ExpressiveCodeTheme.fromJSONString(jsoncString);
};

const loadLanguage = (name: string) =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  JSON.parse(fs.readFileSync(`data/${name}.tmLanguage.json`, `utf-8`));

const loadIcon = (name: string) =>
  fs.readFileSync(
    new URL(`public/icons/${name}.svg`, import.meta.url),
    `utf-8`,
  );

const linkIcon = loadIcon(`link`);

// https://astro.build/config
export default defineConfig({
  build: {
    assets: `assets`,
  },
  integrations: [
    expressiveCode({
      defaultProps: {
        //wrap: true,
        showLineNumbers: false,
      },
      plugins: [
        attribution(),
        languageIcons(),
        curses(),
        pluginCollapsibleSections(),
        pluginLineNumbers(),
      ],
      shiki: {
        langs: [loadLanguage(`caddyfile`)],
      },
      styleOverrides: {
        borderColor: `#00000026`,
        borderRadius: `0.5rem`,
        borderWidth: `0.1rem`,
        codeFontFamily: `Lilex, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`,
        frames: {
          editorActiveTabForeground: `var(--color-text)`,
          editorActiveTabIndicatorTopColor: `#ec4899`,
          editorTabsMarginBlockStart: `-0.5rem`,
          editorTabsMarginInlineStart: `1rem`,
          frameBoxShadowCssValue: `0 0 0.7rem #00000026`,
          terminalTitlebarDotsOpacity: `0`,
        },
      },
      themes: [generateTheme(`ctp-latte`), generateTheme(`ctp-macchiato`)],
      useStyleReset: false,
    }),
    mdx(),
    sitemap(),
  ],
  markdown: {
    gfm: true,
    rehypePlugins: [
      rehypeKatex,
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: `append`,
          content: fromHtmlIsomorphic(
            `<span class="print:!hidden link-heading">${linkIcon}</span>`,
            {
              fragment: true,
            },
          ).children,
        },
      ],
      [
        rehypeExternalLinks,
        {
          rel: [],
          target: `_blank`,
        },
      ],
      // have fun with this one, TypeScript!
      [
        rehypeAccessibleEmojis,
        { ignore: [`title`, `script`, `style`, `svg`, `math`, `code`] },
      ] as [RehypePlugin<unknown[]>, unknown],
      rehypeImageText,
    ],
    remarkPlugins: [remarkMath, remarkToc, remarkReadTime],
  },
  prefetch: {
    prefetchAll: true,
  },
  site: `https://blog.kunet.dev/`,
  vite: {
    plugins: [tailwindcss()],
  },
});
