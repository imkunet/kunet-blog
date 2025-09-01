import { definePlugin } from 'astro-expressive-code';
import type { Element } from 'astro-expressive-code/hast';

// Curses
// Makes all the italic code a different font entirely for *style*.

const fontStyleRegex = /--\d+fs:.+/;

export const curses = () =>
  definePlugin({
    hooks: {
      postprocessRenderedLine: (context) => {
        context.renderData.lineAst.children.forEach((child) => {
          if (child.type !== `element`) return;
          const container = child;

          container.children.forEach((codeChild) => {
            if (child.type !== `element`) return;
            const span = codeChild as Element;
            if (span.tagName !== `span`) return;

            const style = span.properties.style;
            if (style === undefined || typeof style !== `string`) return;

            const styleLines = style.split(`;`);
            const passingStyles: string[] = [];
            styleLines.forEach((line) => {
              if (!fontStyleRegex.test(line)) {
                passingStyles.push(line);
                return;
              }

              passingStyles.push(`font-family:'MonaspaceRadon'`);
            });

            span.properties.style = passingStyles.join(`;`);
          });
        });
      },
    },
    name: `Curses`,
  });
