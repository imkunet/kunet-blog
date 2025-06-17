// one of these days they will allow us to use aliases in this file
import { attribution } from './src/plugins/expressive-code/attribution';
import { curses } from './src/plugins/expressive-code/curses';
import { languageIcons } from './src/plugins/expressive-code/language-icons';
import { rehypeImageText } from './src/plugins/rehype/image-text';
import { remarkReadTime } from './src/plugins/remark/read-time';
import { remarkToc } from './src/plugins/remark/toc';
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

const generateTheme = (name: string) => {
  const jsoncString = fs.readFileSync(new URL(`data/${name}.jsonc`, import.meta.url), 'utf-8');
  return ExpressiveCodeTheme.fromJSONString(jsoncString);
};

const loadLanguage = (name: string) =>
  JSON.parse(fs.readFileSync(`data/${name}.tmLanguage.json`, 'utf-8'));

const loadIcon = (name: string) =>
  fs.readFileSync(new URL(`public/icons/${name}.svg`, import.meta.url), 'utf-8');

const linkIcon = loadIcon('link');

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.kunet.dev/',
  prefetch: {
    prefetchAll: true,
  },
  markdown: {
    remarkPlugins: [remarkMath, remarkToc, remarkReadTime],
    rehypePlugins: [
      rehypeKatex,
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
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
          target: '_blank',
          rel: [],
        },
      ],
      // have fun with this one, TypeScript!
      [rehypeAccessibleEmojis, { ignore: ['title', 'script', 'style', 'svg', 'math', 'code'] }] as [
        RehypePlugin<unknown[]>,
        unknown,
      ],
      rehypeImageText,
    ],
    gfm: true,
  },
  integrations: [
    expressiveCode({
      plugins: [
        attribution(),
        languageIcons(),
        curses(),
        pluginCollapsibleSections(),
        pluginLineNumbers(),
      ],
      shiki: {
        langs: [loadLanguage('caddyfile')],
      },
      defaultProps: {
        //wrap: true,
        showLineNumbers: false,
      },
      useStyleReset: false,
      styleOverrides: {
        borderRadius: '0.5rem',
        borderWidth: '0.1rem',
        borderColor: '#00000026',
        codeFontFamily:
          "Lilex, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
        frames: {
          terminalTitlebarDotsOpacity: '0',
          frameBoxShadowCssValue: '0 0 0.7rem #00000026',
          editorTabsMarginBlockStart: '-0.5rem',
          editorTabsMarginInlineStart: '1rem',
          editorActiveTabIndicatorTopColor: '#ec4899',
          editorActiveTabForeground: 'var(--color-text)',
          // someone told me this looks bad; never uncomment this EVER!!
          // editorBackground:
          //   'radial-gradient(circle, rgb(76 76 76 / 10%) 1px, rgba(0, 0, 0, 0) 1px) 0% 0% / 1rem 1rem',
        },
      },
      themes: [generateTheme('ctp-latte'), generateTheme('ctp-macchiato')],
    }),
    mdx(),
    sitemap(),
  ],
  build: {
    assets: 'assets',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
