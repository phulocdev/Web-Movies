import React, { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import filmListApi from '~/apis/FilmList.api'
import { GiRainbowStar } from 'react-icons/gi'
import { FcFilmReel } from 'react-icons/fc'
import FilmCategory from '~/components/FilmCategory'
import { PiFilmSlateFill } from 'react-icons/pi'
import { HiTv } from 'react-icons/hi2'
import { SiPicartodottv } from 'react-icons/si'
import { QueryConfig } from '~/hooks/useQueryConfig'
import path from '~/constants/path'
import Carousel from '~/components/Carousel'
import FilmList from '~/components/FilmList'
import { addClassNameButtonsSlider } from '~/utils/utils'

export default function Home() {
  const queryConfig: QueryConfig = { page: '1', limit: '30' }

  const filmHotListData = useQuery({
    queryKey: ['film_hot', { queryConfig }],
    queryFn: filmListApi.getHotFilms
  })

  const filmSeriesListData = useQuery({
    queryKey: ['film_series', { queryConfig }],
    queryFn: () => filmListApi.getFilmList('danh-sach', 'phim-bo', queryConfig)
  })

  const filmSingleListData = useQuery({
    queryKey: ['film_single', { queryConfig }],
    queryFn: () => filmListApi.getFilmList('danh-sach', 'phim-le', queryConfig)
  })

  const filmCartoonListData = useQuery({
    queryKey: ['film_cartoon', { queryConfig }],
    queryFn: () => filmListApi.getFilmList('danh-sach', 'hoat-hinh', queryConfig)
  })

  const tvShowListData = useQuery({
    queryKey: ['tv_shows', { queryConfig }],
    queryFn: () => filmListApi.getFilmList('danh-sach', 'tv-shows', queryConfig)
  })

  useEffect(() => {
    addClassNameButtonsSlider()
  }, [])

  return (
    <React.Fragment>
      <FilmCategory
        Icon={<GiRainbowStar size={36} color='#00b0ff' />}
        content={'Phim mới cập nhật'}
        isWatchAll={false}
      />
      <Carousel filmList={filmHotListData.data?.data.items} />

      <FilmCategory Icon={<FcFilmReel size={26} color='#ff5722' />} content={'Phim bộ'} path={path.filmSeries} />
      <FilmList filmList={filmSeriesListData.data?.data.data.items} />

      <FilmCategory Icon={<PiFilmSlateFill size={26} color='#00a152' />} content={'Phim lẻ'} path={path.filmSingle} />
      <FilmList filmList={filmSingleListData.data?.data.data.items} />

      <FilmCategory Icon={<HiTv size={26} color='#00a0b2' />} content={'Tv shows'} path={path.tvShows} />
      <FilmList filmList={tvShowListData.data?.data.data.items} />

      <FilmCategory Icon={<SiPicartodottv size={26} color='#ffc107' />} content={'Hoạt hình'} path={path.filmCartoon} />
      <FilmList filmList={filmCartoonListData.data?.data.data.items} />
    </React.Fragment>
  )
}
