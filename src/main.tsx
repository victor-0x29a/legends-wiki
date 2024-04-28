import React from 'react'
import ReactDOM from 'react-dom/client'
import { GlobalStyle } from './styles/global.style'
import { ChakraProvider } from '@chakra-ui/react'
import { I18nProvider } from './i18n.context'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <I18nProvider>
      <ChakraProvider>
        <GlobalStyle/>
        <h1>hello world.</h1>
      </ChakraProvider>
    </I18nProvider>
  </React.StrictMode>
)
