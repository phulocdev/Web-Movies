import { useIsFetching, useIsMutating } from '@tanstack/react-query'
import Loading from '../Loading'

export default function WrapperLoading() {
  const isFetching = useIsFetching({
    predicate: (query) => JSON.stringify(query.queryKey) !== JSON.stringify(['film_searched_subList'])
  })
  const isMutating = useIsMutating()
  return <div> {isFetching + isMutating > 0 && <Loading />}</div>
}
