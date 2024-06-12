import logo from '~/assets/logo.png'

export default function Header() {
  return (
    <div className='px-3 py-6'>
      <div className='grid grid-cols-12 items-center'>
        <div className='col-span-2 xl:col-span-1'>
          <img src={logo} alt='netflix_logo' className='h-8 w-32 object-cover' />
        </div>
        <div className='col-span-10 lg:col-span-8 xl:col-span-8'>
          <nav>
            <ul className='ml-20 flex items-center'>
              <li>
                <a
                  href='/'
                  className='block px-3 py-2 text-[18px] font-semibold transition-all hover:underline hover:underline-offset-8'
                >
                  Trang chủ
                </a>
              </li>
              <li>
                <a
                  href='#!'
                  className='block px-3 py-2 text-[18px] font-semibold transition-all hover:underline hover:underline-offset-8'
                >
                  Thể loại
                </a>
              </li>
              <li>
                <a
                  href='#!'
                  className='block px-3 py-2 text-[18px] font-semibold transition-all hover:underline hover:underline-offset-8'
                >
                  Quốc gia
                </a>
              </li>
              <li>
                <a
                  href='#!'
                  className='block px-3 py-2 text-[18px] font-semibold transition-all hover:underline hover:underline-offset-8'
                >
                  Phim lẻ
                </a>
              </li>
              <li>
                <a
                  href='#!'
                  className='block px-3 py-2 text-[18px] font-semibold transition-all hover:underline hover:underline-offset-8'
                >
                  Phim bộ
                </a>
              </li>
              <li>
                <a
                  href='#!'
                  className='inline-block px-3 py-2 text-[18px] font-semibold transition-all hover:underline hover:underline-offset-8'
                >
                  Phim hoạt hình
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className='col-span-4 col-start-9 mt-6 lg:mt-0 lg:pr-4 xl:col-span-3 xl:pr-10'>
          <form>
            <input
              type='text'
              placeholder='Tìm kiếm...'
              className='w-full rounded-lg border border-gray-200 px-4 py-2 shadow-sm outline-none transition-all placeholder:text-base placeholder:text-black focus:border-gray-300 focus:shadow-md focus:placeholder:text-white'
            />
          </form>
        </div>
      </div>
    </div>
  )
}
