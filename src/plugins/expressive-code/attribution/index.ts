import { definePlugin } from 'astro-expressive-code';
import { h, type Nodes } from 'astro-expressive-code/hast';

import { embeddedMarkdownToHast } from '../../../utils/embedded-markdown.ts';
import { getAttributionBaseStyles } from './styles.ts';

// Attribution
// add an attribution link to the bottom of the code blocks

export const attribution = () =>
  definePlugin({
    baseStyles: (context) => getAttributionBaseStyles(context),
    hooks: {
      postprocessRenderedBlock: ({
        codeBlock: { metaOptions },
        renderData,
      }) => {
        const attribution = metaOptions.getString(`attribution`);
        if (attribution === undefined) return;

        renderData.blockAst.children?.forEach((element) => {
          if (element.type !== `element`) return;
          if (element.tagName !== `pre`) return;

          element.properties.style = `border-bottom: none;border-radius: 0;`;
        });

        renderData.blockAst.children.push(
          h(
            `div`,
            {
              class: [
                `attribution embedded-markdown text-right prose dark:prose-invert w-full max-w-full`,
              ],
            },
            embeddedMarkdownToHast(
              attribution.replaceAll(`&bt;`, `\``),
            ) as Nodes,
          ),
        );
      },
    },
    name: `Attribution`,
  });
