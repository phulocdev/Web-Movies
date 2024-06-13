interface Props {
  content: string
  Icon: React.ReactNode
}

export default function FilmCategory({ Icon, content }: Props) {
  return (
    <div className='mb-2 mt-6 flex items-center gap-x-1'>
      {Icon}
      <h2 className='text-lg font-medium uppercase'>{content}</h2>
    </div>
  )
}
