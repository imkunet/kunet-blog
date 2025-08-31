import {
  prettierConfig,
  prettierConfigBase,
  prettierConfigTailwind,
} from '@hiddenability/opinionated-defaults/prettier';

export default prettierConfig(prettierConfigBase, prettierConfigTailwind, {
  proseWrap: `always`,
  tailwindStylesheet: `./src/styles/global.css`,
});
