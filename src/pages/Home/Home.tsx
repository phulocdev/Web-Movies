import { useQuery } from '@tanstack/react-query'
import Carousel from '~/components/Carousel'
import FilmList from '~/components/FilmList'
import filmListApi from '~/apis/FilmList.api'
import { GiRainbowStar } from 'react-icons/gi'
import { FcFilmReel } from 'react-icons/fc'
import FilmCategory from '~/components/FilmCategory'
import { PiFilmSlateFill } from 'react-icons/pi'
import { HiTv } from 'react-icons/hi2'
import { SiPicartodottv } from 'react-icons/si'

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
    queryKey: ['tv_shows'],
    queryFn: () => filmListApi.getTvShows({ limit: QUANTITY_FILM_FILTERED })
  })

  return (
    <div className='container'>
      <div className='mt-7'>
        <FilmCategory Icon={<GiRainbowStar size={36} color='#00b0ff' />} content={'Phim mới cập nhật'} />
        <Carousel filmList={filmHotListData.data?.data.items} />
      </div>

      <FilmCategory Icon={<FcFilmReel size={26} color='#ff5722' />} content={'Phim bộ'} />
      <FilmList filmList={filmSeriesListData.data?.data.data.items} isPending={filmSeriesListData.isPending} />

      <FilmCategory Icon={<PiFilmSlateFill size={26} color='#00a152' />} content={'Phim lẻ'} />
      <FilmList filmList={filmSingleListData.data?.data.data.items} isPending={filmSingleListData.isPending} />

      <FilmCategory Icon={<HiTv size={26} color='#00a0b2' />} content={'Tv shows'} />
      <FilmList filmList={tvShowListData.data?.data.data.items} isPending={tvShowListData.isPending} />

      <FilmCategory Icon={<SiPicartodottv size={26} color='#ffc107' />} content={'Hoạt hình'} />
      <FilmList filmList={filmCartoonListData.data?.data.data.items} isPending={filmCartoonListData.isPending} />
    </div>
  )
}
