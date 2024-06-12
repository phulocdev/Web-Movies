import { useQuery } from '@tanstack/react-query'
import Carousel from '~/components/Carousel'
import FilmList from '~/components/FilmList'
import filmListApi from '~/apis/FilmList.api'

const QUANTITY_FILM_FILTERED = 16
export default function Home() {
  const filmHotListData = useQuery({
    queryKey: ['film_hot'],
    queryFn: filmListApi.getHotFilms
  })

  const filmSeriesListData = useQuery({
    queryKey: ['film_series'],
    queryFn: () => filmListApi.getSeriesFilms({ limit: QUANTITY_FILM_FILTERED })
  })

  const filmSingleListData = useQuery({
    queryKey: ['film_single'],
    queryFn: () => filmListApi.getSingleFilms({ limit: QUANTITY_FILM_FILTERED })
  })

  const filmCartoonListData = useQuery({
    queryKey: ['film_cartoon'],
    queryFn: () => filmListApi.getCartoonFilms({ limit: QUANTITY_FILM_FILTERED })
  })

  const tvShowListData = useQuery({
    queryKey: ['tv-shows'],
    queryFn: () => filmListApi.getTvShows({ limit: QUANTITY_FILM_FILTERED })
  })

  console.log(filmSeriesListData.data?.data.data.items)

  return (
    <div className='container'>
      <div className='mt-20'>
        <Carousel filmList={filmHotListData.data?.data.items} />
      </div>

      <h3 className='my-8 text-2xl font-medium uppercase'>Phim bộ</h3>
      <FilmList filmList={filmSeriesListData.data?.data.data.items} />

      <h3 className='my-8 text-2xl font-medium uppercase'>Phim lẻ</h3>
      <FilmList filmList={filmSingleListData.data?.data.data.items} />

      <h3 className='my-8 text-2xl font-medium uppercase'>Tv shows</h3>
      <FilmList filmList={tvShowListData.data?.data.data.items} />

      <h3 className='my-8 text-2xl font-medium uppercase'>Hoạt hình</h3>
      <FilmList filmList={filmCartoonListData.data?.data.data.items} />
    </div>
  )
}
