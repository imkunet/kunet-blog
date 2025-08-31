export interface Frontmatter {
  description: string;
  hero: string | undefined;
  heroAlt: string | undefined;
  hidden: boolean;
  learningDisclaimer: boolean;
  notExpert: boolean;
  readingTime: string;
  tags: string[];
  title: string;
  underConstruction: boolean;
}
