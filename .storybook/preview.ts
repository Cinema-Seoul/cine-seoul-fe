import "virtual:uno.css";
import "@unocss/reset/tailwind-compat.css";
import "../src/ui/styles/global.css";
import "../src/ui/styles/theme-colors.css";

import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
