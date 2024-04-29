import React from 'react'
import ReactDOM from 'react-dom/client'
import { GlobalStyle } from './styles/global.style'
import { ChakraProvider } from '@chakra-ui/react'
import { I18nProvider } from './i18n.context'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <I18nProvider>
      <ChakraProvider>
        <GlobalStyle />
        <RouterProvider router={router} />
      </ChakraProvider>
    </I18nProvider>
  </React.StrictMode>
)
