import type { Preview } from "@storybook/react";
import { withThemeFromJSXProvider } from "@storybook/addon-themes";
import { GlobalStyle } from "../src/styles/global.style";
import React from "react";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    withThemeFromJSXProvider({
      GlobalStyles: GlobalStyle,
    }),
    (Story) => (
      <div>
        <Story />
      </div>
    )
  ]
};

export default preview;
