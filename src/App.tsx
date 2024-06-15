import { useIsFetching, useIsMutating } from '@tanstack/react-query'
import useRouteElements from './hooks/useRouteElements'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loading from './components/Loading'

function App() {
  const routeElements = useRouteElements()
  const isFetching = useIsFetching()
  const isMutating = useIsMutating()
  return (
    <div>
      {isFetching + isMutating > 0 && <Loading />}
      {routeElements}
      <ToastContainer />
    </div>
  )
}

export default App
