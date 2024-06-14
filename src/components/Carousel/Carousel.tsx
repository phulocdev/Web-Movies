import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { FilmHot } from '~/types/Film'
import Banner from '../Banner'
import BannerSkeleton from '../BannerSkeleton'

interface Props {
  filmList?: FilmHot[]
}

export default function Carousel({ filmList }: Props) {
  return (
    <>
      <Swiper
        navigation={true}
        slidesPerView={1}
        speed={1000}
        // autoplay={{
        //   delay: 2000,
        //   disableOnInteraction: false
        // }}
        loop={true}
        modules={[Navigation, Pagination, Autoplay]}
        pagination={{
          clickable: true
        }}
      >
        {filmList ? (
          filmList.map((film) => (
            <SwiperSlide key={film._id}>
              <Banner key={film._id} film={film} isNew />
            </SwiperSlide>
          ))
        ) : (
          <BannerSkeleton />
        )}
      </Swiper>
    </>
  )
}
