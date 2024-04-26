import React from 'react'
import ReactDOM from 'react-dom/client'
import { GlobalStyle } from './styles/global.style'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalStyle/>
    <h1>Hello world!</h1>
  </React.StrictMode>
)
