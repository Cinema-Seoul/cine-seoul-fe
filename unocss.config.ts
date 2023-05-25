import {
  defineConfig,
  presetIcons,
  presetTypography,
  presetUno,
  transformerCompileClass,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";
import { presetGrid } from "./lib/unocss-preset-grid";
import { createColorScaleGenerator } from "./scripts/color-scales-generate";
import transformerMultiStateValues from "./lib/unocss-multi-state-values";

const generateColorScale = createColorScaleGenerator(
  // (value) => `hsl(${value} / <alpha-value>)`
  (value) => `hsl(${value})`
);

export default defineConfig({
  // safelist: [...unoFiles.flatMap((data) => data.safelist ?? [])],
  safelist: [],
  shortcuts: [
    ["out-1", "outline outline-1"],
    ["pressable-opacity", "transition cursor-pointer hover:(opacity-60) active:(opacity-45)"],
  ],
  rules: [
    [
      /^bg@([\w-]+)$/,
      ([, name]) => ({ "background-color": `var(--h-color-${name})` }),
    ],
    [/^text@([\w-]+)$/, ([, name]) => ({ color: `var(--h-color-${name})` })],
    [
      /^border@([\w-]+)$/,
      ([, name]) => ({ "border-color": `var(--h-color-${name})` }),
    ],
    [
      /^outline@([\w-]+)$/,
      ([, name]) => ({ "outline-color": `var(--h-color-${name})` }),
    ],
  ],
  presets: [presetUno(),presetGrid(), presetTypography()], //Container는 PresetUno 걸 이용할 것이므로 순서 유의!
  theme: {
    colors: {
      transprent: "transparent",
      current: "currentColor",
      primary: { ...generateColorScale("teal") },
      neutral: { ...generateColorScale("sage") },
    },
    container: {
      center: true,
      padding: {
        sm: "16px",
        md: "16px",
        lg: "24px",
      },
    },
    breakpoints: {
      sm: "672px", //640px
      md: "800px", //768px
      lg: "1176px", //1128px
    },
  },
  transformers: [
    transformerMultiStateValues({
      brackets: ["{{", "}}"],
      split: ' ',
      variants: [null, "hover", "active", "focus"],
    }),
    transformerMultiStateValues({
      brackets: ["@media{", "}"],
      split: ',',
      variants: [null, "lt-md", "md"],
    }),
    transformerCompileClass(),
    transformerVariantGroup(),
    transformerDirectives(),
  ],
});
