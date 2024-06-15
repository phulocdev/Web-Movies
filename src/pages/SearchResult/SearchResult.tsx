import { useQuery } from '@tanstack/react-query'
import filmListApi from '~/apis/FilmList.api'
import FilmCard from '~/components/FilmCard'
import useQueryConfig from '~/hooks/useQueryConfig'
import { FilmParamsConfig } from '~/types/Film'
const LIMIT_FILM_PER_PAGE = 42
export default function SearchResult() {
  const queryConfig: FilmParamsConfig = useQueryConfig()

  const { data: searchResultData } = useQuery({
    queryKey: ['film_searched', { queryConfig }],
    queryFn: () => filmListApi.getFilmListByKeyword({ ...queryConfig, limit: LIMIT_FILM_PER_PAGE })
  })

  const filmResult = searchResultData?.data.data.items
  return (
    <div>
      {queryConfig.keyword && (
        <h2 className='text-xl font-medium uppercase'>{`Kết quả tìm kiếm theo từ khóa: ${queryConfig.keyword}`}</h2>
      )}
      <div className='-ml-4 mt-5 flex flex-wrap gap-y-5'>
        {filmResult?.map((film) => (
          <div
            key={film._id}
            className='shrink-0 grow-0 basis-1/2 pl-4 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6'
          >
            <FilmCard film={film} />
          </div>
        ))}
      </div>
    </div>
  )
}
