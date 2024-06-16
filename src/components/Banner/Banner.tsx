import { IoPlayCircleSharp } from 'react-icons/io5'
import { FilmHot } from '~/types/Film'
import Label from '../Label'
import classNames from 'classnames'

interface Props {
  film: FilmHot
  isNew?: boolean
  quality?: string
  hasFavouriteButton?: boolean
  handleSaveFilmFavourite?: (slugFilm: string) => void
}

export default function Banner({ film, isNew, quality, hasFavouriteButton, handleSaveFilmFavourite }: Props) {
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
      <h2 className='absolute bottom-24 left-10 z-20 text-4xl font-bold uppercase text-white'>{film.name}</h2>

      {/* Decoration */}
      <div className='absolute right-3 top-4 z-20 rounded-md bg-orange-400 px-4 py-2 text-lg font-bold text-white'>
        {film.year}
      </div>

      <button
        className={classNames(
          'absolute bottom-10 left-10 z-20 flex items-center rounded-md bg-blue-500 px-3 py-2 text-[18px] text-white',
          {
            'cursor-default': hasFavouriteButton,
            'cursor-pointer hover:bg-blue-500/80': !hasFavouriteButton
          }
        )}
      >
        <IoPlayCircleSharp size={22} className='mt-[0.5px]' />
        <span className='ml-1'>Xem ngay</span>
      </button>

      {isNew && (
        <div className='absolute bottom-10 left-44 z-20'>
          <Label classNameColor='bg-pink-500' content={'New 🥳'} />
        </div>
      )}

      {quality && (
        <div className='absolute bottom-10 left-44 z-20 cursor-default'>
          <Label content={quality} />
        </div>
      )}

      {hasFavouriteButton && handleSaveFilmFavourite && (
        <div className='absolute bottom-10 left-60 z-20'>
          <button
            onClick={() => handleSaveFilmFavourite(film.slug)}
            className='cursor-pointer rounded-md border-[1.5px] border-red-400 bg-transparent px-2 py-[6px] text-lg text-white transition-all hover:bg-red-400'
          >
            Yêu thích
          </button>
        </div>
      )}
    </div>
  )
}
