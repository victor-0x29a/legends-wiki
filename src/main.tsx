import React from 'react'
import ReactDOM from 'react-dom/client'
import { GlobalStyle } from './styles/global.style'
import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <GlobalStyle/>
      <h1>Hello world!</h1>
    </ChakraProvider>
  </React.StrictMode>
)
