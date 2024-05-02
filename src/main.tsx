import React from 'react'
import ReactDOM from 'react-dom/client'
import { GlobalStyle } from './styles/global.style'
import { ChakraProvider } from '@chakra-ui/react'
import { I18nProvider } from './contexts/i18n.context'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { AuthProvider } from './contexts/auth.context'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 5
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <I18nProvider>
          <ChakraProvider>
            <GlobalStyle />
            <ToastContainer />
            <RouterProvider router={router} />
          </ChakraProvider>
        </I18nProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
