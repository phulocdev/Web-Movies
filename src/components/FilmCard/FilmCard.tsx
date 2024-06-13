import { useRef } from 'react'
import { TiTickOutline } from 'react-icons/ti'
import { useNavigate } from 'react-router-dom'
import path from '~/constants/path'
import { FilmFiltered } from '~/types/Film'
import { getImageUrl } from '~/utils/utils'

interface Props {
  film: FilmFiltered
}

export default function FilmCard({ film }: Props) {
  const descRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const handleMouseEnter = () => {
    descRef.current?.classList.remove('translate-y-full')
  }

  const handleMouseLeave = () => {
    descRef.current?.classList.add('translate-y-full')
  }

  return (
    <div
      className='relative aspect-[2/3] rounded-sm dark:bg-black'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Thumbnail */}
      <img src={getImageUrl(film.poster_url)} className='absolute inset-0 h-full w-full rounded-sm object-cover' />
      <div className='bg-gradient absolute inset-0 z-10'></div>

      {/* Decoration */}
      <span className='absolute bottom-8 left-1 z-20 rounded-md bg-black/55 px-2 py-1 text-[12px] text-gray-200'>
        {film.year}
      </span>
      <span className='absolute bottom-8 left-12 z-20 rounded-md bg-black/55 px-2 py-1 text-[12px] text-gray-200'>
        {film.quality}
      </span>
      <span className='absolute bottom-8 left-[90px] z-20 max-w-[74px] overflow-hidden truncate rounded-md bg-black/55 px-2 py-1 text-[12px] text-gray-200'>
        {film.episode_current}
      </span>
      <h2 className='absolute bottom-0 z-10 mt-1 min-h-5 w-full truncate bg-white text-sm font-semibold'>
        {film.name}
      </h2>

      {/* Description */}
      <div
        ref={descRef}
        className='absolute bottom-0 z-20 h-[45%] w-full translate-y-full border border-t-0 border-gray-200 bg-neutral-50 px-2 py-1 shadow-xl transition-transform duration-300'
      >
        <h2 className='text-[12px] text-sm font-semibold'>{film.name}</h2>

        <div className='mt-1'>
          <span className='mt-1 flex items-center text-[13px] text-orange-600'>
            <TiTickOutline />
            {film.category[0].name}
          </span>
          <span className='mt-1 flex items-center text-[13px] text-orange-600'>
            <TiTickOutline />
            {film.episode_current}
          </span>
          <button
            onClick={() => {
              navigate(`${path.filmDetail}/${film.slug}`)
            }}
            className='absolute bottom-1 left-2 rounded-md bg-blue-500 px-3 py-1 text-[13px] text-white hover:opacity-90'
          >
            Xem ngay
          </button>
        </div>
      </div>
    </div>
  )
}
