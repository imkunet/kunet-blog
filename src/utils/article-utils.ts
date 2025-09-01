import type { MDXInstance } from 'astro';

import type { Frontmatter } from '@/utils/article-types';

export const extractFilePathData = (
  filePath: string,
): { date: number; title: string } => {
  const pathParts = filePath.split(`/`);
  const fileName = pathParts.at(-2)!;
  const dateAndSlug = fileName.split(`-`);
  const yearPart = pathParts.at(-3)!;

  const year = Number.parseInt(yearPart, 10);
  const month = Number.parseInt(dateAndSlug[0], 10);
  const day = Number.parseInt(dateAndSlug[1], 10);

  const title = dateAndSlug.slice(2).join(`-`);
  const date = Date.parse(`${year}-${month}-${day}`);

  return { date, title };
};

export const allArticles = Object.values(
  import.meta.glob<MDXInstance<Frontmatter>>(`@/articles/*/*/*.mdx`, {
    eager: true,
  }),
).sort(
  (a, b) => extractFilePathData(b.file).date - extractFilePathData(a.file).date,
);

export const allArticlesButHidden = allArticles.filter(
  (a) =>
    !a.frontmatter.underConstruction ||
    !a.frontmatter.hidden ||
    import.meta.env.DEV,
);
