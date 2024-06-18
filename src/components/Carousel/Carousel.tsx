import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import { FilmHot } from '~/types/Film'
import Banner from '../Banner'
import BannerSkeleton from '../BannerSkeleton'
import React from 'react'
import { Link } from 'react-router-dom'
import path from '~/constants/path'

interface Props {
  filmList?: FilmHot[]
}

const Carousel = ({ filmList }: Props) => {
  return (
    <>
      <Swiper
        navigation={true}
        slidesPerView={1}
        speed={1000}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false
        }}
        loop={true}
        modules={[Navigation, Autoplay]}
        pagination={{
          clickable: true
        }}
      >
        {filmList ? (
          filmList.map((film) => (
            <SwiperSlide key={film._id}>
              <Link to={`${path.filmDetail}/${film.slug}`}>
                <Banner key={film._id} film={film} isNew />
              </Link>
            </SwiperSlide>
          ))
        ) : (
          <BannerSkeleton />
        )}
      </Swiper>
    </>
  )
}

export default React.memo(Carousel)
