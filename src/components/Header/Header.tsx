import { Link, NavLink } from 'react-router-dom'
import logo from '~/assets/logo.png'
import path from '~/constants/path'
import Popover from '../Popover'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import countryApi from '~/apis/Country.api'
import categoryApi from '~/apis/Category.api'
import { IoChevronDown, IoMenu } from 'react-icons/io5'
import { useContext, useEffect, useRef, useState } from 'react'
import SearchBar, { SearchBarEventTarget } from '../SearchBar/SearchBar'
import { ResponseFilter } from '~/types/Response'
import { FilmFiltered } from '~/types/Film'
import { getImageUrl } from '~/utils/utils'
import { MdDarkMode, MdLightMode } from 'react-icons/md'
import { HiComputerDesktop } from 'react-icons/hi2'
import { theme } from '~/constants/config'
import { AppContext } from '~/context/app.context'

export default function Header() {
  const { theme: currentTheme, setTheme } = useContext(AppContext)
  const [filmSearchSubList, setFilmSearchSubList] = useState<FilmFiltered[]>([])
  const queryClient = useQueryClient()
  const subMenuRef = useRef<HTMLDivElement>(null)

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
      setFilmSearchSubList(cachedData?.data.data?.items || [])
    }
    SearchBarEventTarget.addEventListener('searchSuccess', handleSearchSuccess)
    return () => {
      SearchBarEventTarget.removeEventListener('searchSuccess', handleSearchSuccess)
    }
  }, [queryClient])

  const handleChangeTheme = (themeName: string) => {
    if (themeName === theme.dark) {
      document.documentElement.classList.remove(theme.light)
      document.documentElement.classList.add(themeName)
      localStorage.theme = themeName
      setTheme(theme.dark)
      return
    }
    if (themeName === theme.light) {
      document.documentElement.classList.remove(theme.dark)
      document.documentElement.classList.add(themeName)
      localStorage.theme = themeName
      setTheme(theme.light)
      return
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.remove(theme.light)
      document.documentElement.classList.add(theme.dark)
      setTheme(theme.dark)
    } else {
      document.documentElement.classList.remove(theme.dark)
      document.documentElement.classList.add(theme.light)
      setTheme(theme.light)
    }
    localStorage.removeItem('theme')
  }

  const handleToggleSubMenu = () => {
    if (!subMenuRef.current) return
    if (subMenuRef.current?.classList.contains('hidden')) {
      subMenuRef.current?.classList.remove('hidden')
      document.getElementById('wrapperLogo')?.classList.remove('hidden')
    } else {
      subMenuRef.current?.classList.add('hidden')
      document.getElementById('wrapperLogo')?.classList.add('hidden')
    }
  }

  return (
    <div className='bg-neutral-50 py-4 lg:sticky lg:top-0 lg:z-40 dark:bg-slate-900'>
      <div className='container'>
        <div className='relative z-[201] lg:hidden'>
          <IoMenu size={30} className='cursor-pointer text-black dark:text-white' onClick={handleToggleSubMenu} />
        </div>
        <div className='grid grid-cols-12 items-center gap-x-4'>
          <div id='wrapperLogo' className='h-11] z-[201] col-span-1 mt-3 hidden w-24 lg:static lg:mt-0 lg:block'>
            <Link to={path.home} className='border-none outline-none'>
              <div className='relative lg:aspect-[3.2/1]'>
                <img
                  loading='lazy'
                  src={logo}
                  alt='Netflix logo'
                  className='h-full w-full object-cover lg:absolute lg:inset-0'
                />
              </div>
            </Link>
          </div>
          <div
            ref={subMenuRef}
            className='absolute bottom-0 left-0 right-0 top-0 z-[200] col-span-7 hidden bg-white text-black sm:right-[50%] lg:static lg:block lg:bg-transparent dark:bg-slate-900 dark:text-white'
          >
            <nav>
              <ul className='mt-24 flex flex-col pl-2 lg:mt-0 lg:flex-row lg:items-center lg:pl-0'>
                <li>
                  <NavLink
                    to={path.home}
                    className={({ isActive }) => {
                      const activeClass = isActive ? 'text-[#ff9800]' : ''
                      return `block px-2 py-2 text-base font-semibold transition-all lg:hover:text-[#ff9800] xl:px-3 ${activeClass} dark:text-white`
                    }}
                  >
                    Trang chủ
                  </NavLink>
                </li>
                <Popover
                  children={
                    <div className='flex items-center gap-x-[2px] px-2 py-2 text-base font-semibold transition-all lg:hover:text-[#ff9800] xl:px-3 dark:text-white'>
                      <span className='cursor-default'>Thể loại</span>
                      <IoChevronDown className='mt-1' />
                    </div>
                  }
                  popoverContent={
                    <div className='grid grid-cols-3 items-center rounded-sm bg-white p-3 shadow-md outline-none md:grid-cols-4 dark:bg-slate-800 dark:text-white'>
                      {categoryList?.map((cate, index) => (
                        <Link
                          key={index}
                          to={`${path.category}/${cate.slug}`}
                          className='cursor-pointer rounded-sm border-none px-4 py-2 outline-none ring-0 transition-colors hover:bg-gray-100 hover:text-orange-400 dark:hover:bg-slate-900'
                        >
                          {cate.name}
                        </Link>
                      ))}
                    </div>
                  }
                />

                <Popover
                  children={
                    <div className='flex items-center gap-x-[2px] px-2 py-2 text-base font-semibold transition-all lg:hover:text-[#ff9800] xl:px-3 dark:text-white'>
                      <span className='cursor-default'>Quốc gia</span>
                      <IoChevronDown className='mt-1' />
                    </div>
                  }
                  popoverContent={
                    <div className='grid grid-cols-3 rounded-sm bg-white p-3 shadow-md outline-none md:grid-cols-4 dark:bg-slate-800 dark:text-white'>
                      {countryList?.map((country, index) => (
                        <Link
                          key={index}
                          to={`${path.country}/${country.slug}`}
                          className='cursor-pointer rounded-sm border-none px-4 py-2 outline-none ring-0 transition-colors hover:bg-gray-100 hover:text-orange-400 dark:hover:bg-slate-900'
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
                      const activeClass = isActive ? 'text-[#ff9800]' : ''
                      return `block px-2 py-2 text-base font-semibold transition-all lg:hover:text-[#ff9800] xl:px-3 ${activeClass} dark:text-white`
                    }}
                  >
                    Phim lẻ
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={path.filmSeries}
                    className={({ isActive }) => {
                      const activeClass = isActive ? 'text-[#ff9800]' : ''
                      return `block px-2 py-2 text-base font-semibold transition-all lg:hover:text-[#ff9800] xl:px-3 ${activeClass} dark:text-white`
                    }}
                  >
                    Phim bộ
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={path.filmFavourite}
                    className={({ isActive }) => {
                      const activeClass = isActive ? 'text-[#ff9800]' : ''
                      return `block px-2 py-2 text-base font-semibold transition-all lg:hover:text-[#ff9800] xl:px-3 ${activeClass} dark:text-white`
                    }}
                  >
                    Phim yêu thích
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
          <div className='col-span-12 mt-3 sm:col-span-5 lg:col-span-3 lg:mt-0'>
            <Popover
              children={<SearchBar />}
              popoverContent={
                <div className='min-h-12 w-80 rounded-sm bg-white p-3 shadow-md dark:bg-slate-800 dark:text-white'>
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
                    <div className='flex items-center justify-center p-2 text-base dark:bg-slate-800 dark:text-white'>
                      Empty!
                    </div>
                  )}
                </div>
              }
              hasArrow={false}
              offsetWithPopover={4}
              arrowHeight={0}
              triggerType='click'
            />
          </div>
          <div className='absolute right-4 top-4 z-[201] sm:right-6 sm:top-8 lg:static lg:col-span-1 lg:mt-0'>
            <Popover
              children={
                <div className='flex justify-end'>
                  {currentTheme === theme.light ? (
                    <MdLightMode className='text-black dark:text-white' size={22} />
                  ) : (
                    <MdDarkMode className='text-black dark:text-white' size={22} />
                  )}
                </div>
              }
              popoverContent={
                <div className='mr-4 flex w-40 flex-col gap-x-1 rounded-sm bg-white p-2 shadow-md lg:mr-0 dark:bg-slate-800 dark:shadow-none'>
                  <button
                    onClick={() => handleChangeTheme(theme.dark)}
                    className='flex items-center gap-x-2 border-none p-2 text-left text-black outline-none hover:bg-slate-100 dark:text-white dark:hover:bg-slate-900'
                  >
                    <MdDarkMode className='text-black dark:text-white' size={22} /> Dark
                  </button>
                  <button
                    onClick={() => handleChangeTheme(theme.light)}
                    className='flex items-center gap-x-2 border-none p-2 text-left text-black outline-none hover:bg-slate-100 dark:text-white dark:hover:bg-slate-900'
                  >
                    <MdLightMode className='text-black dark:text-white' size={22} /> Light
                  </button>
                  <button
                    onClick={() => handleChangeTheme(theme.system)}
                    className='flex items-center gap-x-2 border-none p-2 text-left text-black outline-none hover:bg-slate-100 dark:text-white dark:hover:bg-slate-900'
                  >
                    <HiComputerDesktop className='text-black dark:text-white' size={22} />
                    System
                  </button>
                </div>
              }
              hasArrow={false}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
