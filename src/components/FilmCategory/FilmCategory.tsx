import React from 'react'
import { TiChevronRight } from 'react-icons/ti'
import { Link } from 'react-router-dom'

interface Props {
  content: string
  Icon: React.ReactNode
  isWatchAll?: boolean
  path?: string
}

const FilmCategory = ({ Icon, content, path = '#!', isWatchAll = true }: Props) => {
  return (
    <div className='mb-2 mt-6 flex items-center gap-x-1'>
      {Icon}
      <h2 className='text-base font-medium uppercase'>{content}</h2>
      <div className='ml-auto flex items-center hover:text-[#ff9800]'>
        {isWatchAll && (
          <React.Fragment>
            <Link to={path} className='text-base font-medium'>
              Xem tất cả
            </Link>
            <TiChevronRight size={20} className='mt-[3px]' />
          </React.Fragment>
        )}
      </div>
    </div>
  )
}

export default React.memo(FilmCategory)
