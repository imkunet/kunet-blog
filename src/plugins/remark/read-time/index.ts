/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { Root } from 'mdast';

import { toString } from 'mdast-util-to-string';
import readingTime from 'reading-time';

// https://docs.astro.build/en/recipes/reading-time/
// now in TypeScript
// but the types aren't useful...

// biome-ignore lint/suspicious/noExplicitAny: unimportant
const plugin = (tree: Root, { data }: any) => {
  const text = toString(tree);
  const readTime = readingTime(text);
  data.astro.frontmatter.readingTime = readTime.text;
};

export const remarkReadTime = () => plugin;
