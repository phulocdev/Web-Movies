import { useIsFetching, useIsMutating } from '@tanstack/react-query'
import Loading from '../Loading'

export default function WrapperLoading() {
  const isFetching = useIsFetching()
  const isMutating = useIsMutating()
  return <div> {isFetching + isMutating > 0 && <Loading />}</div>
}
