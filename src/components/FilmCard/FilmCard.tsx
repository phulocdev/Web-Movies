import FilmFiltered from '~/types/FilmSeries'

interface Props {
  film: FilmFiltered
}

export default function FilmCard({ film }: Props) {
  return (
    <div className='relative h-full w-full overflow-hidden rounded-md bg-white dark:bg-black'>
      <img
        src={`https://img.phimapi.com/${film.poster_url}`}
        className='h-96 w-full object-cover transition-all hover:scale-110'
      />
      <h2 className='absolute bottom-5 left-[50%] w-[90%] -translate-x-[50%] text-center text-lg font-semibold text-white'>
        {film.name}
      </h2>
    </div>
  )
}
