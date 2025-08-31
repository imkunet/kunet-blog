import type { Element, Nodes, Root } from 'hast';

import { h } from 'hastscript';
import { visit } from 'unist-util-visit';

import {
  embeddedMarkdownToHast,
  embeddedMarkdownToString,
} from '../../../utils/embedded-markdown.ts';

// based off of https://github.com/josestg/rehype-figure/blob/master/index.js
// now in Typescript
// also considers title then alt text
// then renders the actual markdown

const buildFigure = ({ properties }: Element) => {
  const { title, ...props } = properties;
  const caption = title ?? properties.alt;

  let imageProps = props;
  if (caption)
    imageProps = {
      ...imageProps,
      title: embeddedMarkdownToString(caption.toString()),
    };

  const renderedCaption =
    caption ?
      h(`figcaption`, embeddedMarkdownToHast(caption.toString()) as Nodes)
    : ``;
  return h(`figure`, { class: `image-figure` }, [
    h(`img`, imageProps),
    renderedCaption,
  ]);
};

const plugin = (tree: Root) => {
  visit(tree, { tagName: `p` }, (node, index) => {
    const images = node.children
      .filter((child) => (child as Element).tagName === `img`)
      .map((image) => buildFigure(image as Element));
    if (images.length === 0) return;

    tree.children[index ?? 0] =
      images.length === 1 ?
        images[0]
      : (tree.children[index ?? 0] = h(
          `div`,
          { class: `image-figure-container` },
          images,
        ));
  });
};

export const rehypeImageText = () => plugin;
