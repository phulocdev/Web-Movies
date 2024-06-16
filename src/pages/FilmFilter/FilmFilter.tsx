import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useLocation, useParams } from 'react-router-dom'
import filmListApi from '~/apis/FilmList.api'
import useQueryConfig from '~/hooks/useQueryConfig'
import FilmCard from '~/components/FilmCard'
import { isDontNeedFilmText } from '~/utils/utils'
import Pagination from '~/components/Pagination'

const LIMIT_FILM_PER_PAGE = 42
export default function FilmFilter() {
  const queryConfig = useQueryConfig()
  const location = useLocation()
  const { typeCategory, categorySlug } = useParams()

  const { data: filmFilteredData } = useQuery({
    queryKey: ['film_filtered', { typeCategory, categorySlug, queryConfig }],
    queryFn: () =>
      filmListApi.getFilmList(typeCategory as string, categorySlug as string, {
        ...queryConfig,
        limit: LIMIT_FILM_PER_PAGE
      }),
    placeholderData: keepPreviousData
  })
  const filmFilteredList = filmFilteredData?.data.data.items
  const titlePage = filmFilteredData?.data.data.titlePage

  if (!filmFilteredList) return null
  return (
    <div>
      <h2 className='text-xl font-medium uppercase'>{`Danh sách tất cả ${isDontNeedFilmText((titlePage as string).toLocaleLowerCase()) ? '' : 'phim'} ${titlePage}`}</h2>
      <div className='-ml-4 mt-5 flex flex-wrap gap-y-5'>
        {filmFilteredList?.map((film) => (
          <div
            key={film._id}
            className='shrink-0 grow-0 basis-1/2 pl-4 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6'
          >
            <FilmCard film={film} />
          </div>
        ))}
      </div>
      <div className='mt-7'>
        <Pagination
          pageSize={filmFilteredData.data.data.params.pagination.totalPages}
          path={location.pathname}
          queryConfig={queryConfig}
        />
      </div>
    </div>
  )
}
