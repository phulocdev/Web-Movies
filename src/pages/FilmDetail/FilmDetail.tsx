import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import filmListApi from '~/apis/FilmList.api'

export default function FilmDetail() {
  const { nameSlug } = useParams()

  const { data: filmDetailData } = useQuery({
    queryKey: ['film_detail', { slug: nameSlug }],
    queryFn: () => filmListApi.getFilmDetail(nameSlug as string)
  })
  const filmDetail = filmDetailData?.data.movie
  console.log(filmDetail?.category)

  return (
    <div className='container'>
      {filmDetail ? (
        <div className='relative mt-10 aspect-[2/1] h-[500px] w-full rounded-sm md:aspect-[3/1]'>
          <div className='bg-gradient absolute inset-0 z-10'></div>
          <img
            src={filmDetail.thumb_url}
            alt={filmDetail.name}
            className='absolute inset-0 h-full w-full rounded-sm object-cover'
          />
          <h1 className='absolute bottom-2 left-2 mt-3 text-3xl font-semibold text-white'>{filmDetail.name}</h1>
        </div>
      ) : (
        <div className='mt-10 h-[500px] rounded-sm bg-neutral-100'></div>
      )}
    </div>
  )
}
