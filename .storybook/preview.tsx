import React from "react";
import type { Preview } from "@storybook/react";
import { withThemeFromJSXProvider } from "@storybook/addon-themes";
import { GlobalStyle } from "../src/styles/global.style";
import { I18nProvider } from "../src/shared/contexts/i18n.context"
import { ChakraProvider } from "@chakra-ui/react";
import { LegendsColor } from "../src/styles/constants.style";
import { MemoryRouter } from "react-router-dom"

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
      <ChakraProvider>
        <MemoryRouter basename="/">
          <I18nProvider>
            <div style={{ backgroundColor: LegendsColor.backgroundColors.primary, padding: '2rem' }}>
              <Story />
            </div>
          </I18nProvider>
        </MemoryRouter>
      </ChakraProvider>
    )
  ]
};

export default preview;
