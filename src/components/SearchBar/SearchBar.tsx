import { useQuery } from '@tanstack/react-query'
import { debounce } from 'lodash'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import filmListApi from '~/apis/FilmList.api'
import path from '~/constants/path'

export const SearchBarEventTarget = new EventTarget()

const SearchBar = () => {
  const [keyword, setKeyword] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  // Query này được gọi khi value của key 'enable' thay đổi liên tục HOẶC
  /// enable là TRUE mãi mãi (default of tanstack) VÀ queryKey phải thay đổi liên tục
  const searchResult = useQuery({
    queryKey: ['film_searched_subList'],
    queryFn: () => filmListApi.getFilmListByKeyword({ keyword, limit: 5 })
  })

  useEffect(() => {
    if (searchResult.isSuccess) {
      const searchSuccessEvent = new Event('searchSuccess')
      SearchBarEventTarget.dispatchEvent(searchSuccessEvent)
    }
  }, [searchResult.isSuccess, searchResult.data])

  const handleInputClick = () => {
    setTimeout(() => {
      inputRef.current?.focus()
    }, 180)
  }

  // Nếu ta thêm 'searchResult' là dependency của useMemo này thì:
  // cho dù ta đã dùng debounce để hạn chế việc call API liên tục
  // nhưng hàm 'handleSearchOnType' sẽ bị thay đổi tham chiếu
  // cho nên nó sẽ làm mất đi tính chất quan trọng của debounce là `closures JS`
  // cho nên khi ta gõ 'hiii' nó sẽ call lại API 4 lần  =  số kí tự của keyword
  // cái thằng gõ i lần cuối cùng sẽ call API và làm mất đi tính chất clusures JS -> những lần gọi API
  // của những kí tự trc đó sẽ được thực hiện lại
  // const handleSearchOnType = useMemo(
  //   () =>
  //     debounce(() => {
  //       searchResult.refetch()
  //     }, 1500),
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   []
  // )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearchOnType = useCallback(
    debounce(() => {
      searchResult.refetch()
    }, 1500),
    []
  )

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value)
    if (event.target.value !== '') {
      handleSearchOnType()
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === ' ') {
      event.stopPropagation()
    }
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
    <form onSubmit={handleSubmit} autoComplete='off'>
      <div className='flex items-center gap-x-1'>
        <input
          type='text'
          name='keyword'
          value={keyword}
          ref={inputRef}
          placeholder='Tìm kiếm...'
          className='rounded-lg border border-gray-200 px-4 py-2 shadow-sm outline-none transition-all placeholder:text-black focus:border-gray-300 focus:shadow-md'
          onChange={handleInputChange}
          onClick={handleInputClick}
          onKeyDown={handleKeyDown}
        />
        <button type='submit' className='shrink-0 rounded-lg border border-gray-200 bg-white px-4 py-3'>
          <BiSearch size={18} />
        </button>
      </div>
    </form>
  )
}

export default React.memo(SearchBar)
