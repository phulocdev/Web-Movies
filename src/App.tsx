import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import useRouteElements from './hooks/useRouteElements'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import WrapperLoading from './components/WrapperLoading'
import { setDefaultTheme } from './utils/utils'
import { useEffect } from 'react'
import AppContextProvider from './context/app.context'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  }
})

function App() {
  const routeElements = useRouteElements()
  // Set theme to website for first render
  useEffect(() => {
    setDefaultTheme()
  }, [])
  return (
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        {routeElements}
        <ToastContainer />
      </AppContextProvider>
      <WrapperLoading />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
