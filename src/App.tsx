import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import useRouteElements from './hooks/useRouteElements'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import Loading from './components/Loading'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import WrapperLoading from './components/WrapperLoading'

// function App() {
//   // console.log('app re render')
//   const routeElements = useRouteElements()
//   // const isFetching = useIsFetching()
//   // const isMutating = useIsMutating()
//   return (
//     <div>
//       {/* {isFetching + isMutating > 0 && <Loading />} */}
//       {routeElements}
//         <ToastContainer />
//     </div>
//   )
// }

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

  return (
    <QueryClientProvider client={queryClient}>
      {routeElements}
      <ToastContainer />
      <WrapperLoading />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
