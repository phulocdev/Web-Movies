import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { RouterProvider } from 'react-router-dom'
import userRoutesElement from './userRouteElements'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function App() {
  const { router } = userRoutesElement()
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false
      }
    }
  })

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
