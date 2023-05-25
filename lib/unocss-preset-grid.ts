/* eslint-disable no-empty-pattern */
import type { Preset } from "unocss";
import { escapeSelector } from "unocss";

export interface GridOptions {
  prefix?: string;
  piece?: string;
  gutter?: string;
  columns?: number;
  breakpoints?: Record<string, string>;
}

export function presetGrid(options: GridOptions = {}): Preset<any> {

  const columns = options?.columns ?? 12;

  const prefix = options?.prefix ?? 'cq-';
  
  // Default Breakpoints
  const piece = options?.piece ?? "60px";
  const breakpoints = options?.breakpoints ?? {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  };

  // Default Gutter
  const gutter = options?.gutter ?? "1.5rem";

  return {
    name: "unocss-preset-grid",
    variants: [
      (matcher) => {
        if (/\\@child$/.test(matcher)) {
          return {
            matcher: matcher.replace(/\\@child$/, ''),
            selector: (old) => `${old} > *`
          } 
        }
      }
    ],
    rules: [
      [
        new RegExp(`^__container$`),
        ([], { rawSelector, theme }) => {
          const _selector = escapeSelector(rawSelector);
          const _breakpoints = theme.breakpoints ?? breakpoints;

          const template = Object.keys(_breakpoints).map(
            (
              breakpoint: string
            ) => `@media (min-width: ${_breakpoints[breakpoint]}) {
              .${_selector} {
                max-width: calc(${_breakpoints[breakpoint]} - ${piece});
              }
            }`
          );

          return `
            .${_selector}, .${_selector}-fluid {
              --${prefix}gutter-x: ${gutter};
              --${prefix}gutter-y: 0;
              
              width: 100%;
              padding-right: calc(var(--${prefix}gutter-x) * .5);
              padding-left: calc(var(--${prefix}gutter-x) * .5);
              margin-right: auto;
              margin-left: auto;
            }
            
            ${template.join("\n")}
          `.replace(/^ {12}/gm, "");
        },
      ],
      [
        /^row$/,
        ([], { rawSelector, constructCSS }) => {
          const v1 = constructCSS({
            [`--${prefix}gutter-x`]: gutter,
            [`--${prefix}gutter-y`]: '0',
  
            "display": "flex",
            "flex-wrap": "wrap",
  
            "margin-top": `calc(-1 * var(--${prefix}gutter-y))`,
            "margin-right": `calc(-.5 * var(--${prefix}gutter-x))`,
            "margin-left": `calc(-.5 * var(--${prefix}gutter-x))`,
          }, rawSelector);

          const v2 = constructCSS({
            "flex-shrink": "0",
            "width": "100%",
            "max-width": "100%",
            "padding-right": `calc(var(--${prefix}gutter-x) * .5)`,
            "padding-left": `calc(var(--${prefix}gutter-x) * .5)`,
            "margin-top": `var(--${prefix}gutter-y)`,
          }, `${rawSelector}____`);

          return v1 + '\n' + v2.replace(/_{4}/, '>*');
        },
      ],
      [
        new RegExp(`^col-?(\\d*)$`),
        ([, size]: any): any => {
          if (size) {
            return {
              flex: "0 0 auto",
              width: `${(size / columns) * 100}%`,
            };
          } else {
            return {
              flex: "1 0 0%",
            };
          }
        },
      ],
      [
        `col-auto`,
        {
          flex: "0 0 auto",
          width: "auto",
        },
      ],
      [
        `col-fill`,
        {
          flex: "1 1 auto",
          width: "auto",
        },
      ],
      [
        new RegExp(`^offset-(\\d+)$`),
        ([, size]: any): any => ({
          "margin-left": size === "0" ? 0 : `${(size / columns) * 100}%`,
        }),
      ],
      [
        new RegExp(`^g([xy])?-(\\d+)$`),
        ([, dim, size]: any): any => {
          const gutterObject: { [key: string]: string } = {};
          if (dim !== "y")
            gutterObject[`--${prefix}gutter-x`] = `${0.25 * size}rem`;
          if (dim !== "x")
            gutterObject[`--${prefix}gutter-y`] = `${0.25 * size}rem`;
          return gutterObject;
        },
      ],
    ],
  };
}

export default presetGrid;
