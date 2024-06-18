import { IoPlayCircleSharp } from 'react-icons/io5'
import { FilmHot } from '~/types/Film'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import path from '~/constants/path'

interface Props {
  film: FilmHot
  isNew?: boolean
  quality?: string
  hasFavouriteButton?: boolean
  handleSaveFilmFavourite?: (slugFilm: string) => void
}

export default function Banner({ film, isNew, quality, hasFavouriteButton, handleSaveFilmFavourite }: Props) {
  const navigate = useNavigate()
  const handleWatchNow = () => {
    navigate(`${path.filmDetail}/${film.slug}`)
  }
  return (
    <div className='relative aspect-[2/1] rounded-sm bg-neutral-100 md:aspect-[3/1]'>
      {/* Poster image */}
      <div className='bg-gradient absolute inset-0 z-10'></div>
      <img
        loading='lazy'
        src={film.thumb_url}
        alt={film.name}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null
          currentTarget.src =
            'https://t4.ftcdn.net/jpg/03/01/90/79/360_F_301907970_ZVaPcSGe9rgYgRMRGUcbf91YxNwB7d2W.jpg'
        }}
        className='absolute inset-0 h-full w-full rounded-sm object-cover'
      />
      <h2 className='absolute bottom-12 left-4 z-20 text-2xl font-bold uppercase text-white sm:bottom-14 md:bottom-16 md:text-3xl lg:bottom-24 lg:left-10 lg:text-4xl'>
        {film.name}
      </h2>

      {/* Decoration */}
      <div className='absolute right-2 top-2 z-20 rounded-md bg-orange-400 p-2 text-sm font-medium text-white sm:right-3 sm:top-4 sm:px-4 sm:py-2 sm:text-base sm:font-bold lg:text-lg'>
        {film.year}
      </div>

      <button
        onClick={handleWatchNow}
        className={classNames(
          'absolute bottom-3 left-4 z-[20] flex items-center gap-x-[2px] rounded-md bg-blue-500 p-1 text-sm text-white sm:p-2 md:gap-x-2 md:text-base lg:bottom-10 lg:left-10 lg:px-3 lg:py-2 lg:text-lg',
          {
            'cursor-default': hasFavouriteButton,
            'cursor-pointer hover:bg-blue-500/80': !hasFavouriteButton
          }
        )}
      >
        <IoPlayCircleSharp className='mt-[0.5px] text-lg md:text-[22px]' />
        Xem ngay
      </button>

      {isNew && (
        <div className='absolute bottom-3 left-[112px] z-20 sm:left-[120px] md:left-[138px] lg:bottom-10 lg:left-44'>
          <span className='inline-block rounded-md bg-pink-500 p-1 text-sm text-white sm:p-2 md:text-base lg:px-3 lg:py-2 lg:text-lg'>
            New 🥳
          </span>
        </div>
      )}

      {quality && (
        <div className='absolute bottom-3 left-[110px] z-20 cursor-default sm:left-[120px] md:left-[138px] lg:bottom-10 lg:left-44'>
          <span className='inline-block rounded-md bg-blue-500 px-2 py-1 text-sm text-white sm:p-2 md:text-base lg:px-3 lg:py-2 lg:text-lg'>
            {quality}
          </span>
        </div>
      )}

      {hasFavouriteButton && handleSaveFilmFavourite && (
        <div className='absolute bottom-3 left-[153px] z-20 cursor-default sm:left-[160px] md:left-[182px] lg:bottom-10 lg:left-[240px]'>
          <button
            onClick={() => handleSaveFilmFavourite(film.slug)}
            className='cursor-pointer rounded-md border-[1px] border-red-400 bg-transparent p-1 py-[3px] text-sm text-white transition-all hover:bg-red-400 sm:px-2 sm:py-[7px] md:border-[1.5px] md:text-base lg:px-2 lg:py-[6px] lg:text-lg'
          >
            Yêu thích
          </button>
        </div>
      )}
    </div>
  )
}
