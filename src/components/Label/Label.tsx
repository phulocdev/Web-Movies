interface Props {
  classNameColor?: string
  content?: string
  classNameCustom?: string
}

export default function Label({ classNameColor = 'bg-blue-500', content = 'Default', classNameCustom = '' }: Props) {
  return (
    <span className={`inline-block rounded-md ${classNameColor} px-3 py-2 text-[18px] text-white ${classNameCustom}`}>
      {content}
    </span>
  )
}
