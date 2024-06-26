import { FaFacebook, FaGithub, FaHeart } from 'react-icons/fa'
import { TiSocialInstagram } from 'react-icons/ti'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div
      className='bg-no-repeate relative h-60 bg-cover bg-center font-semibold text-white md:h-[150px]'
      style={{ backgroundImage: 'url(https://movies-ax.netlify.app/static/media/background.4791eb57.jpg)' }}
    >
      <div className='absolute inset-0 z-10 bg-black/65'></div>
      <div className='container absolute inset-x-0 inset-y-5 z-20 grid grid-cols-2 gap-x-0 gap-y-2 md:grid-cols-4 md:gap-x-4'>
        <div>
          <span className='text-lg sm:text-xl'>Information</span>
          <div className='text-sm sm:text-base'>Pham Phu Loc</div>
          <div className='mt-5 flex items-center gap-x-2 text-lg sm:text-2xl'>
            <Link to='https://www.facebook.com/profile.php?id=100009479606442'>
              <FaFacebook className='transition-colors hover:text-orange-400' />
            </Link>
            <Link to='#!'>
              <FaGithub className='transition-colors hover:text-orange-400' />
            </Link>
            <Link to='https://www.instagram.com/phu10c/'>
              <TiSocialInstagram className='transition-colors hover:text-orange-400' />
            </Link>
          </div>
        </div>
        <div>
          <span className='text-lg sm:text-xl'>About Us</span>
          <ul className='text-sm sm:text-base'>
            <li>
              <a href='#!' className='mt-1 block transition-colors hover:text-orange-400'>
                Introduction
              </a>
            </li>
            <li>
              <a href='#!' className='mt-1 block transition-colors hover:text-orange-400'>
                Company History
              </a>
            </li>
            <li>
              <a href='#!' className='mt-1 block transition-colors hover:text-orange-400'>
                Our Team
              </a>
            </li>
          </ul>
        </div>
        <div>
          <span className='text-lg sm:text-xl'>Services</span>
          <ul className='text-sm sm:text-base'>
            <li>
              <a href='#!' className='mt-1 block transition-colors hover:text-orange-400'>
                Main Services
              </a>
            </li>
            <li>
              <a href='#!' className='mt-1 block transition-colors hover:text-orange-400'>
                Products
              </a>
            </li>
            <li>
              <a href='#!' className='mt-1 block transition-colors hover:text-orange-400'>
                Solutions
              </a>
            </li>
          </ul>
        </div>
        <div>
          <span className='text-lg sm:text-xl'>API Provider</span>
          <ul className='text-sm sm:text-base'>
            <li>
              <a href='https://kkphim.vip/' className='mt-1 block uppercase transition-colors hover:text-orange-400'>
                KKPHIM.VIP
              </a>
            </li>
            <li className='mt-2 flex items-center gap-x-1 text-red-500'>
              <FaHeart />
              <FaHeart />
              <FaHeart />
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
