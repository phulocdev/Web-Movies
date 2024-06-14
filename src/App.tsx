import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import useRouteElements from './hooks/useRouteElements'

function App() {
  const routeElements = useRouteElements()
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false
      }
    }
  })
  // const { isFetching, isMutating } = queryClient

  return (
    <QueryClientProvider client={queryClient}>
      {routeElements}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
