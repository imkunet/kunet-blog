import type { ResolverContext } from 'astro-expressive-code';

export const getAttributionBaseStyles = ({ cssVar }: ResolverContext) => {
  const tabBarBackground = [
    `linear-gradient(to bottom, transparent ${cssVar(`borderWidth`)}, ${cssVar(`frames.editorTabBarBorderBottomColor`)} ${cssVar(`borderWidth`)})`,
    `linear-gradient(${cssVar(`frames.editorTabBarBackground`)}, ${cssVar(`frames.editorTabBarBackground`)})`,
  ].join(`,`);

  const attributionStyles = `.attribution {
    background: ${tabBarBackground};
		background-repeat: no-repeat;
    border-radius: 0 0 ${cssVar(`borderRadius`)} ${cssVar(`borderRadius`)};
    padding: calc(${cssVar(`uiPaddingBlock`)} + ${cssVar(`frames.editorActiveTabIndicatorHeight`)}) ${cssVar(`uiPaddingInline`)};
    position: relative;

    & > * {
      opacity: 0.8;
      transition: opacity 200ms ease-in-out;
    }

    &:hover > * {
      opacity: 1;
    }

    &::before {
      content: '';
      position: absolute;
      pointer-events: none;
      inset: 0;
      border: ${cssVar(`borderWidth`)} solid ${cssVar(`frames.editorTabBarBorderColor`)};
      border-radius: inherit;
      border-top: none;
    }
  }`;

  const styles = [attributionStyles];
  return styles.join(`\n`);
};
