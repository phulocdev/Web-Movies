import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import useRouteElements from './hooks/useRouteElements'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import WrapperLoading from './components/WrapperLoading'
import AppContextProvider from './context/app.context'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import { useEffect } from 'react'
import { setDefaultTheme } from './utils/utils'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import { HelmetProvider } from 'react-helmet-async'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  }
})

const helmetContext = {}

function App() {
  const routeElements = useRouteElements()

  useEffect(() => {
    setDefaultTheme()
  }, [])
  return (
    <HelmetProvider context={helmetContext}>
      <QueryClientProvider client={queryClient}>
        <AppContextProvider>
          <ErrorBoundary>
            {routeElements}
            <ToastContainer />
          </ErrorBoundary>
          <ScrollToTop />
        </AppContextProvider>
        <WrapperLoading />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </HelmetProvider>
  )
}

export default App
