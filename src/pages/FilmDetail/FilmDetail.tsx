import { useQuery } from '@tanstack/react-query'
import { pick } from 'lodash'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import filmListApi from '~/apis/FilmList.api'
import Banner from '~/components/Banner'
import BannerSkeleton from '~/components/BannerSkeleton'
import FilmDescSkeleton from '~/components/FilmDescSkeleton'
import Label from '~/components/Label'
import Film, { FilmFiltered } from '~/types/Film'
import { saveFilmToFavouriteList } from '~/utils/utils'

export default function FilmDetail() {
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState<number>(0)
  const { nameSlug } = useParams()

  const { data: filmDetailData, isPending } = useQuery({
    queryKey: ['film_detail', { slug: nameSlug }],
    queryFn: () => filmListApi.getFilmDetail(nameSlug as string)
  })
  const filmDetail = filmDetailData?.data

  const handleEpisodeChange = (newEpisodeIndex: number) => () => {
    setCurrentEpisodeIndex(newEpisodeIndex)
  }

  const handleSaveFilmFavourite = () => {
    if (filmDetail?.movie !== '') {
      const film = pick(filmDetail?.movie as Film, [
        'slug',
        'id',
        'name',
        'poster_url',
        'year',
        'quality',
        'episode_current'
      ])
      saveFilmToFavouriteList({
        ...(film as FilmFiltered),
        poster_url: (film.poster_url as string).split('https://img.phimapi.com/')[1]
      })
    }
    toast.success('Add film to favourite list success❣️')
  }

  if (filmDetailData && !filmDetailData?.data.status) {
    return (
      <div className='flex min-h-screen items-center justify-center text-4xl font-semibold uppercase'>
        Movie not found
      </div>
    )
    // throw new Error('Movie not found')
  }
  return (
    <div>
      {isPending ? (
        <React.Fragment>
          <BannerSkeleton />
          <FilmDescSkeleton />
        </React.Fragment>
      ) : (
        <div>
          {filmDetail?.movie && (
            <React.Fragment>
              <Banner
                film={filmDetail.movie}
                quality={filmDetail.movie.quality}
                hasFavouriteButton
                handleSaveFilmFavourite={handleSaveFilmFavourite}
              />
              <section className='mt-5 flex flex-col gap-y-3 text-lg'>
                <div>
                  <span className='text-lg text-[#ff9800]'>Nội dung</span>
                  <p className='text-[17px] leading-normal'>{filmDetail.movie.content}</p>
                </div>
                <div>
                  <span className='text-lg text-[#ff9800]'>Quốc gia:</span>
                  <span className='ml-2 text-[17px]'>
                    {filmDetail.movie.country.map((country, index, countryArr) => {
                      if (index < countryArr.length - 1) return country.name + ', '
                      return country.name + '.'
                    })}
                  </span>
                </div>
                <div>
                  <span className='text-lg text-[#ff9800]'>Thể loại:</span>
                  <span className='ml-2 text-[17px]'>
                    {filmDetail.movie.category.map((category, index, categoryArr) => {
                      if (index < categoryArr.length - 1) return category.name + ', '
                      return category.name + '.'
                    })}
                  </span>
                </div>
                <div>
                  <span className='text-lg text-[#ff9800]'>Đạo diễn:</span>
                  <span className='ml-2 text-[17px]'>
                    {filmDetail.movie.director.map((name, index, nameArr) => {
                      if (index < nameArr.length - 1) return name + ', '
                      return name + '.'
                    })}
                  </span>
                </div>
                <div>
                  <span className='text-lg text-[#ff9800]'>Diễn viên:</span>
                  <span className='ml-2 text-[17px]'>
                    {filmDetail.movie.actor.map((name, index, nameArr) => {
                      if (index < nameArr.length - 1) return name + ', '
                      return name + '.'
                    })}
                  </span>
                </div>
              </section>

              <div className='mx-auto mt-16 w-[80%]'>
                <iframe
                  src={filmDetailData?.data.episodes[0].server_data[currentEpisodeIndex].link_embed}
                  className='aspect-[16/9] h-full w-full'
                  title={filmDetail.movie.name}
                  allowFullScreen
                ></iframe>

                {filmDetail.episodes.length > 1 ? (
                  <div className='mt-2 text-xl'>{`${filmDetail.movie.name}: Tập ${currentEpisodeIndex + 1}`}</div>
                ) : (
                  <div className='mt-2 text-xl'>{`${filmDetail.movie.name}: Full`}</div>
                )}
              </div>

              <div className='mt-8 flex flex-wrap items-center gap-x-2 gap-y-3'>
                {filmDetail?.episodes[0].server_data.length === 1 ? (
                  <Label content='Full' />
                ) : (
                  filmDetail?.episodes[0].server_data.map((item, index) => {
                    const activeClass =
                      index === currentEpisodeIndex ? ' text-white bg-orange-400 ' : ' bg-white text-black '
                    return (
                      <button
                        className={`rounded-md border-[1.5px] border-orange-400 px-2 py-1 text-[15px] transition-all hover:bg-orange-400 hover:text-white ${activeClass}`}
                        onClick={handleEpisodeChange(index)}
                      >
                        {item.name}
                      </button>
                    )
                  })
                )}
              </div>
            </React.Fragment>
          )}
        </div>
      )}
    </div>
  )
}
