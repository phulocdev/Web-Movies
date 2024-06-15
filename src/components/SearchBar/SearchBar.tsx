import { useRef, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import path from '~/constants/path'

export default function SearchBar() {
  const [keyword, setKeyword] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const handleInputClick = () => {
    setTimeout(() => {
      inputRef.current?.focus()
    }, 180)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!keyword.trim()) {
      toast.error('Hãy nhập tên phim cần tìm kiếm', {
        autoClose: 3000,
        position: 'top-center'
      })
      return
    }
    inputRef.current?.click()

    navigate({
      pathname: path.search,
      search: createSearchParams({ keyword }).toString()
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex items-center gap-x-1'>
        <input
          value={keyword}
          onChange={handleInputChange}
          ref={inputRef}
          onClick={handleInputClick}
          type='text'
          name='keyword'
          placeholder='Tìm kiếm...'
          className='rounded-lg border border-gray-200 px-4 py-2 shadow-sm outline-none transition-all placeholder:text-black focus:border-gray-300 focus:shadow-md'
        />
        <button type='submit' className='shrink-0 rounded-lg border border-gray-200 bg-white px-4 py-3'>
          <BiSearch size={18} />
        </button>
      </div>
    </form>
  )
}
