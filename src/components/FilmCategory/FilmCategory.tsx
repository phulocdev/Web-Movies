import { TiChevronRight } from 'react-icons/ti'

interface Props {
  content: string
  Icon: React.ReactNode
}

export default function FilmCategory({ Icon, content }: Props) {
  return (
    <div className='mb-2 mt-6 flex items-center gap-x-1'>
      {Icon}
      <h2 className='text-lg font-medium uppercase'>{content}</h2>
      <div className='ml-auto flex items-center hover:text-[#ff9800]'>
        <a href='#!' className='text-base font-medium'>
          Xem tất cả
        </a>
        <TiChevronRight size={20} className='mt-[3px]' />
      </div>
    </div>
  )
}
