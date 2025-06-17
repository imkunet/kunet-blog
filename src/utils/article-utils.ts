import type { Frontmatter } from '@/utils/article-types';
import type { MDXInstance } from 'astro';

export const extractFilePathData = (filePath: string): { date: number; title: string } => {
  const pathParts = filePath.split('/');
  const fileName = pathParts[pathParts.length - 2];
  const dateAndSlug = fileName.split('-');
  const yearPart = pathParts[pathParts.length - 3];

  const year = parseInt(yearPart);
  const month = parseInt(dateAndSlug[0]);
  const day = parseInt(dateAndSlug[1]);

  const title = dateAndSlug.slice(2).join('-');
  const date = Date.parse(year + '-' + month + '-' + day);

  return { date, title };
};

export const allArticles = Object.values(
  import.meta.glob<MDXInstance<Frontmatter>>('@/articles/*/*/*.mdx', { eager: true }),
).sort((a, b) => extractFilePathData(b.file).date - extractFilePathData(a.file).date);

export const allArticlesButHidden = allArticles.filter(
  (a) => !a.frontmatter.underConstruction || !a.frontmatter.hidden || import.meta.env.DEV,
);
