import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import FilmCard from '../FilmCard'
import React, { useEffect, useState } from 'react'
import { throttle } from 'lodash'
import { getQuantityOfFilms } from '~/utils/utils'
import FilmListSkeleton from '../FilmListSkeleton'
import { FilmFiltered } from '~/types/Film'

interface Props {
  filmList?: FilmFiltered[]
}
const COUNT_FILM_DEFAULT = getQuantityOfFilms(window.innerWidth)

const FilmList = ({ filmList }: Props) => {
  const [countFilm, setCountFilm] = useState<number>(COUNT_FILM_DEFAULT)

  useEffect(() => {
    window.addEventListener('resize', throttle(handleScreenWidthChange, 500))
    return () => {
      window.removeEventListener('resize', handleScreenWidthChange)
    }
  }, [])

  const handleScreenWidthChange = () => {
    const screenWidth = document.body.clientWidth
    setCountFilm(getQuantityOfFilms(screenWidth))
  }
  return (
    <Swiper slidesPerView={countFilm} navigation={true} spaceBetween={30} modules={[Navigation]}>
      {filmList ? (
        filmList.map((film) => (
          <SwiperSlide key={film._id}>
            <FilmCard film={film} />
          </SwiperSlide>
        ))
      ) : (
        <FilmListSkeleton quantitySkeleton={countFilm} />
      )}
    </Swiper>
  )
}

export default React.memo(FilmList)
