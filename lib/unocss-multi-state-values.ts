import type { SourceCodeTransformer } from "unocss";
import { escapeRegExp } from 'unocss';

export default function transformerMultiStateValues({
  brackets = ["{{", "}}"],
  split = ",",
  variants = [null, "hover", "active"],
}: {
  brackets?: [string, string],
  split?: string,
  variants?: (string | null)[];
} = {}): SourceCodeTransformer {
  const regex = new RegExp(
    `(?<=["'\`].*?)([^\\s]*)${escapeRegExp(brackets[0])}([^\\s]*)${escapeRegExp(brackets[1])}([^'"\`\\s]*)`,
    "g"
  );

  return {
    name: "transformer-multi-state-values",
    enforce: "pre",
    idFilter(id) {
      return /\.[tj]sx$/.test(id);
    },
    transform(code) {
      const matches = [...code.original.matchAll(regex)];

      // console.log("matches", matches);

      if (!matches.length) return;

      for (const match of matches) {
        if (!match.index) continue;

        const start = match.index;
        const [, prefix, rawValues, suffix] = match;
        const replacement: string[] = [];

        rawValues.split(split).forEach((value, i) => {
          if (!value.length) return;
          const variant = variants[i];
          replacement.push(
            `${variant ? `${variant}:` : ""}${prefix}${value}${suffix}`
          );
        });

        console.log(
          "overwrited: ",
          code.toString().substring(start, start + match[0].length),
          ": => :",
          replacement.join(" ")
        );
        code.overwrite(start, start + match[0].length, replacement.join(" "));
      }
    },
  };
}
