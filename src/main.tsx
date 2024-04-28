import React from 'react'
import ReactDOM from 'react-dom/client'
import { GlobalStyle } from './styles/global.style'
import { ChakraProvider } from '@chakra-ui/react'
import { Item } from './pages/item'
import { I18nProvider } from './i18n.context'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <I18nProvider>
      <ChakraProvider>
        <GlobalStyle/>
        <Item/>
      </ChakraProvider>
    </I18nProvider>
  </React.StrictMode>
)
