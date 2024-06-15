import { Link, NavLink } from 'react-router-dom'
import logo from '~/assets/logo.png'
import path from '~/constants/path'
import Popover from '../Popover'
import { useQuery } from '@tanstack/react-query'
import countryApi from '~/apis/Country.api'
import categoryApi from '~/apis/Category.api'
import { IoChevronDown } from 'react-icons/io5'
import SearchBar from '../SearchBar'

export default function Header() {
  const { data: countriesData } = useQuery({
    queryKey: ['countries'],
    queryFn: countryApi.getAllCountries
  })
  const countryList = countriesData?.data

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: categoryApi.getAllCategories
  })
  const categoryList = categoriesData?.data

  return (
    <div className='sticky top-0 z-40 bg-neutral-50 py-4'>
      <div className='container'>
        <div className='grid grid-cols-12 items-center'>
          <div className='col-span-2 xl:col-span-1'>
            <Link to={path.home}>
              <img src={logo} alt='netflix_logo' className='h-8 w-32 object-cover' />
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
                <div className='min-h-5 w-[370px] rounded-sm bg-white p-3 shadow-md md:w-[450px]'>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. At neque quaerat quam maiores culpa sed esse
                  quo fugiat. Est, repellat.
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
