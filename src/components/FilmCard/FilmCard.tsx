import { Link } from 'react-router-dom'
import path from '~/constants/path'
import { FilmFiltered } from '~/types/Film'
import { getImageUrl } from '~/utils/utils'

interface Props {
  film: FilmFiltered
}

export default function FilmCard({ film }: Props) {
  return (
    <Link to={`${path.filmDetail}/${film.slug}`}>
      <div className='group relative aspect-[2/3] overflow-hidden rounded-md dark:bg-black'>
        {/* Thumbnail */}
        <img
          loading='lazy'
          src={getImageUrl(film.poster_url)}
          className='absolute inset-0 block h-full w-full rounded-sm object-cover transition-transform duration-200 group-hover:scale-110'
        />
        <div className='bg-gradient absolute inset-0 z-10'></div>
        {/* Decoration */}
        <div className='absolute left-1 top-1 z-20 flex items-center gap-x-[3px]'>
          {film.year && <span className='rounded-md bg-black/55 px-2 py-1 text-[12px] text-gray-200'>{film.year}</span>}
          {film.quality && (
            <span className='rounded-md bg-black/55 px-2 py-1 text-[12px] text-gray-200'>{film.quality}</span>
          )}
          {film.episode_current && (
            <span className='max-w-[74px] overflow-hidden truncate rounded-md bg-black/55 px-2 py-1 text-[12px] text-gray-200'>
              {film.episode_current}
            </span>
          )}
        </div>
        <h2 className='absolute bottom-2 z-10 min-h-5 w-full text-center text-base font-semibold text-white'>
          {film.name}
        </h2>
      </div>
    </Link>
  )
}
