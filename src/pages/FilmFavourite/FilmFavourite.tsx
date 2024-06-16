import FilmCard from '~/components/FilmCard'
import { getFavouriteFilmList } from '~/utils/utils'

export default function FilmFavourite() {
  const favouriteFilmList = getFavouriteFilmList()
  return (
    <div>
      <h1 className='text-xl font-medium uppercase'>Danh sách phim yêu thích</h1>
      {favouriteFilmList.length === 0 ? (
        <div className='flex min-h-[100vh] items-center justify-center text-2xl'>Empty List</div>
      ) : (
        <div className='-ml-4 mt-6 flex flex-wrap gap-y-5'>
          {favouriteFilmList.map((film) => (
            <div
              key={film._id}
              className='shrink-0 grow-0 basis-1/2 pl-4 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6'
            >
              <FilmCard film={film} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
