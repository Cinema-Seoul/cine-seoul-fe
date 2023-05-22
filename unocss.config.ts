import {
  defineConfig,
  presetUno,
  transformerCompileClass,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";
// import { getUnoFiles } from "./scripts/uno-files";
import { presetGrid } from './lib/unocss-preset-grid';
import { createColorScaleGenerator } from "./scripts/color-scales-generate";

const generateColorScale = createColorScaleGenerator(
  // (value) => `hsl(${value} / <alpha-value>)`
  (value) => `hsl(${value})`
);

// const unoFiles = (await getUnoFiles({ cwd: __dirname })) as {
//   safelist?: string[] | string;
// }[];

import uiComponentsConfig from "./src/components/ui/safe-styles.dev";

export default defineConfig({
  // safelist: [...unoFiles.flatMap((data) => data.safelist ?? [])],
  safelist: [...uiComponentsConfig.safelist],
  rules: [
    [/^bg@([\w-]+)$/, ([, name]) => ({ "background-color": `var(--h-color-${name})` })],
    [/^text@([\w-]+)$/, ([, name]) => ({ color: `var(--h-color-${name})` })],
    [/^border@([\w-]+)$/, ([, name]) => ({ "border-color": `var(--h-color-${name})` })],
  ],
  theme: {
    colors: {
      transprent: "transparent",
      current: "currentColor",
      primary: { ...generateColorScale("orange") },
      neutral: { ...generateColorScale("sand") },
    },
    container: {
      center: true,
    },
    breakpoints: {
      sm: "672px", //640px
      md: "800px", //768px
      lg: "1176px", //1128px
    },
  },
  presets: [presetUno(), presetGrid()],
  transformers: [
    transformerCompileClass(),
    transformerVariantGroup(),
    transformerDirectives(),
  ],
});
