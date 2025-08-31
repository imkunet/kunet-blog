import type { Root } from 'mdast';

import { toc } from 'mdast-util-toc';

// this code is based on https://github.com/remarkjs/remark-toc/
// except now it's TypeScript and opinionated & themed to this site

const plugin = (tree: Root) => {
  const result = toc(tree, {
    heading: `Contents`,
    tight: true,
  });

  if (
    result.endIndex === undefined ||
    result.endIndex === -1 ||
    result.index === undefined ||
    result.index === -1 ||
    !result.map
  ) {
    return;
  }

  result.map.data = {
    hProperties: {
      className: `toc bg-mantle dark:bg-crust rounded-lg outline outline-1 outline-crust dark:outline-mantle py-4 my-0 [&_li]:my-0 [&_ul]:my-0 inline-flex flex-col pr-8`,
    },
  };

  tree.children = [
    ...tree.children.slice(0, result.index),
    result.map,
    ...tree.children.slice(result.endIndex),
  ];
};

export const remarkToc = () => plugin;
