import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { FilmHot } from '~/types/FilmHot'
import { IoPlayCircleSharp } from 'react-icons/io5'

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
        className='h-[500px] w-full rounded-lg bg-white'
      >
        {filmList &&
          filmList.map((film) => (
            <SwiperSlide key={film._id}>
              <div className='relative flex h-full w-full items-center justify-center bg-neutral-200'>
                <div className='absolute right-3 top-4 rounded-md bg-orange-400 px-4 py-2 text-lg font-bold text-white'>
                  {film.year}
                </div>
                <img
                  src={film.thumb_url}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null
                    currentTarget.src =
                      'https://t4.ftcdn.net/jpg/03/01/90/79/360_F_301907970_ZVaPcSGe9rgYgRMRGUcbf91YxNwB7d2W.jpg'
                  }}
                  className='h-full w-full object-cover'
                />
                <h2 className='absolute bottom-28 left-10 text-4xl font-bold uppercase text-white'>{film.name}</h2>
                <button className='absolute bottom-10 left-10 flex items-center rounded-md bg-blue-500 px-5 py-3 text-[18px] text-white hover:bg-blue-500/80'>
                  <IoPlayCircleSharp size={22} className='mt-[0.5px]' />
                  <span className='ml-1'>Xem ngay</span>
                </button>
                <div className='absolute bottom-10 left-48 rounded-md bg-pink-500 px-4 py-3 text-[18px] font-semibold text-white'>
                  New 🥳
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  )
}
