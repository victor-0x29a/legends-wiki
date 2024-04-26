import React from "react";
import type { Preview } from "@storybook/react";
import { withThemeFromJSXProvider } from "@storybook/addon-themes";
import { GlobalStyle } from "../src/styles/global.style";
import { I18nProvider } from "../src/i18n.context"

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
      <I18nProvider>
        <div>
          <Story />
        </div>
      </I18nProvider>
    )
  ]
};

export default preview;
