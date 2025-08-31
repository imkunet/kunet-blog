import type { Nodes } from 'hast';

import { toHtml } from 'hast-util-to-html';
import { toString } from 'mdast-util-to-string';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';
import rehypeExternalLinks from 'rehype-external-links';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

export const embeddedMarkdownProcessor = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeAccessibleEmojis)
  .use(rehypeExternalLinks, { rel: [], target: `_blank` });

export const pureEmbeddedMarkdownProcessor = unified().use(remarkParse);

export const embeddedMarkdownToHast = (markdown: string) =>
  embeddedMarkdownProcessor.runSync(embeddedMarkdownProcessor.parse(markdown));

export const embeddedMarkdownToHtml = (markdown: string) =>
  toHtml(embeddedMarkdownToHast(markdown) as Nodes);

export const stripOutsideTags = (html: string) => {
  const start = html.indexOf(`>`) + 1;
  const end = html.lastIndexOf(`<`);
  return html.slice(start, end);
};

export const embeddedMarkdownToString = (markdown: string) =>
  toString(pureEmbeddedMarkdownProcessor.parse(markdown));
