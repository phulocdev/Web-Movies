import FilmFiltered from '~/types/FilmFiltered'

interface Props {
  film: FilmFiltered
}

export default function FilmCard({ film }: Props) {
  return (
    <div className='relative w-full rounded-sm dark:bg-black'>
      <img
        src={`https://img.phimapi.com/${film.poster_url}`}
        className='h-72 w-full rounded-sm object-cover transition-all'
      />
      <span className='absolute bottom-8 left-1 rounded-md bg-black/55 px-2 py-1 text-[12px] text-gray-200'>
        {film.year}
      </span>
      <span className='absolute bottom-8 left-12 rounded-md bg-black/55 px-2 py-1 text-[12px] text-gray-200'>
        {film.quality}
      </span>
      <span className='absolute bottom-8 left-[88px] max-w-[74px] overflow-hidden truncate rounded-md bg-black/55 px-2 py-1 text-[12px] text-gray-200'>
        {film.episode_current}
      </span>
      <h2 className='mt-1 min-h-5 truncate text-sm font-semibold'>{film.name}</h2>
    </div>
  )
}
