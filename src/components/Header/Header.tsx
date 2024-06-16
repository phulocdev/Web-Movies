import { Link, NavLink } from 'react-router-dom'
import logo from '~/assets/logo.png'
import path from '~/constants/path'
import Popover from '../Popover'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import countryApi from '~/apis/Country.api'
import categoryApi from '~/apis/Category.api'
import { IoChevronDown } from 'react-icons/io5'
import { useEffect, useState } from 'react'
import SearchBar, { SearchBarEventTarget } from '../SearchBar/SearchBar'
import { ResponseFilter } from '~/types/Response'
import { FilmFiltered } from '~/types/Film'
import { getImageUrl } from '~/utils/utils'

export default function Header() {
  const [filmSearchSubList, setFilmSearchSubList] = useState<FilmFiltered[]>([])
  const queryClient = useQueryClient()

  const { data: countriesData } = useQuery({
    queryKey: ['countries'],
    queryFn: countryApi.getAllCountries
  })

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: categoryApi.getAllCategories
  })

  const countryList = countriesData?.data
  const categoryList = categoriesData?.data

  useEffect(() => {
    const handleSearchSuccess = () => {
      const cachedData = queryClient.getQueryData<{ data: ResponseFilter<FilmFiltered> }>(['film_searched_subList'])
      setFilmSearchSubList(cachedData?.data.data.items || [])
    }
    SearchBarEventTarget.addEventListener('searchSuccess', handleSearchSuccess)
    return () => {
      SearchBarEventTarget.removeEventListener('searchSuccess', handleSearchSuccess)
    }
  }, [queryClient])

  return (
    <div className='sticky top-0 z-40 bg-neutral-50 py-4'>
      <div className='container'>
        <div className='grid grid-cols-12 items-center'>
          <div className='col-span-2 xl:col-span-1'>
            <Link to={path.home}>
              <img loading='lazy' src={logo} alt='netflix_logo' className='h-8 w-32 object-cover' />
            </Link>
          </div>
          <div className='col-span-10 lg:col-span-8 xl:col-span-8'>
            <nav>
              <ul className='ml-20 flex items-center'>
                <li>
                  <NavLink
                    to={path.home}
                    className={({ isActive }) => {
                      const extendClass = isActive ? 'text-[#ff9800]' : ''
                      return `block px-3 py-2 text-base font-semibold transition-all hover:text-[#ff9800] ${extendClass}`
                    }}
                  >
                    Trang chủ
                  </NavLink>
                </li>
                <Popover
                  children={
                    <div className='flex items-center gap-x-[2px] px-3 py-2 text-base font-semibold transition-all hover:text-[#ff9800]'>
                      <span className='cursor-default'>Thể loại</span>
                      <IoChevronDown className='mt-1' />
                    </div>
                  }
                  popoverContent={
                    <div className='grid grid-cols-3 rounded-sm bg-white p-3 shadow-md outline-none md:grid-cols-4'>
                      {categoryList?.map((cate, index) => (
                        <Link
                          key={index}
                          to={`${path.category}/${cate.slug}`}
                          className='cursor-pointer rounded-sm border-none px-4 py-2 outline-none ring-0 transition-colors hover:bg-gray-100 hover:text-orange-400'
                        >
                          {cate.name}
                        </Link>
                      ))}
                    </div>
                  }
                />

                <Popover
                  children={
                    <div className='flex items-center gap-x-[2px] px-3 py-2 text-base font-semibold transition-all hover:text-[#ff9800]'>
                      <span className='cursor-default'>Quốc gia</span>
                      <IoChevronDown className='mt-1' />
                    </div>
                  }
                  popoverContent={
                    <div className='grid grid-cols-3 rounded-sm bg-white p-3 shadow-md outline-none md:grid-cols-4'>
                      {countryList?.map((country, index) => (
                        <Link
                          key={index}
                          to={`${path.country}/${country.slug}`}
                          className='cursor-pointer rounded-sm border-none px-4 py-2 outline-none ring-0 transition-colors hover:bg-gray-100 hover:text-orange-400'
                        >
                          {country.name}
                        </Link>
                      ))}
                    </div>
                  }
                />

                <li>
                  <NavLink
                    to={path.filmSingle}
                    className={({ isActive }) => {
                      const extendClass = isActive ? 'text-[#ff9800]' : ''
                      return `block px-3 py-2 text-base font-semibold transition-all hover:text-[#ff9800] ${extendClass}`
                    }}
                  >
                    Phim lẻ
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={path.filmSeries}
                    className={({ isActive }) => {
                      const extendClass = isActive ? 'text-[#ff9800]' : ''
                      return `block px-3 py-2 text-base font-semibold transition-all hover:text-[#ff9800] ${extendClass}`
                    }}
                  >
                    Phim bộ
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={path.filmFavourite}
                    className={({ isActive }) => {
                      const extendClass = isActive ? 'text-[#ff9800]' : ''
                      return `block px-3 py-2 text-base font-semibold transition-all hover:text-[#ff9800] ${extendClass}`
                    }}
                  >
                    Phim yêu thích
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
          <div className='col-span-4 col-start-9 mt-6 lg:mt-0 lg:pr-4 xl:col-span-3 xl:pr-10'>
            <Popover
              children={<SearchBar />}
              popoverContent={
                <div className='min-h-12 w-[290px] rounded-sm bg-white p-3 shadow-md'>
                  {filmSearchSubList.length > 0 ? (
                    filmSearchSubList.map((film) => (
                      <Link
                        key={film._id}
                        to={`${path.filmDetail}/${film.slug}`}
                        className='flex flex-col gap-x-2 p-1 transition-colors duration-150 hover:bg-neutral-100'
                      >
                        <article className='flex items-center gap-x-2'>
                          <div className='relative aspect-[1/1] shrink-0 grow-0 basis-1/6 rounded-sm'>
                            <img
                              loading='lazy'
                              src={getImageUrl(film.poster_url)}
                              alt={film.name}
                              className='absolute inset-0 h-full w-full rounded-sm object-cover'
                            />
                          </div>
                          <h3 className='flex-grow truncate text-sm font-medium'>{film.name}</h3>
                        </article>
                      </Link>
                    ))
                  ) : (
                    <div className='flex items-center justify-center p-2 text-base'>Empty!</div>
                  )}
                </div>
              }
              hasArrow={false}
              offsetWithPopover={4}
              arrowHeight={0}
              triggerType='click'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
