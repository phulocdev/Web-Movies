import classNames from 'classnames'
// import classNames from 'classnames/bind'
import { Link, createSearchParams } from 'react-router-dom'
import { QueryConfig } from '~/hooks/useQueryConfig'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
  path: string
}

const RANGE = 2
export default function Pagination({ pageSize, queryConfig, path }: Props) {
  // current page
  const page = Number(queryConfig.page)

  const renderPagination = () => {
    let dotAfter = false
    let dotBefore = false

    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <span key={index} className='text-gray-black mx-2 cursor-default bg-white text-lg'>
            ...
          </span>
        )
      }
      return null
    }

    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <span key={index} className='text-gray-black mx-1 cursor-default bg-white text-lg font-medium'>
            . . .
          </span>
        )
      }
      return null
    }

    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        const isActive = pageNumber === page

        if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber <= pageSize - RANGE) {
          return renderDotAfter(index)
        } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index)
          } else if (pageNumber > page + 2 && pageNumber <= pageSize - RANGE) {
            return renderDotAfter(index)
          }
        } else if (page >= pageSize - RANGE * 2 && pageNumber < page - RANGE && pageNumber > RANGE) {
          return renderDotBefore(index)
        }

        return (
          <Link
            to={{
              pathname: path,
              search: createSearchParams({ ...queryConfig, page: pageNumber.toString() }).toString()
            }}
            key={index}
            className={classNames(
              'flex h-11 min-w-10 items-center justify-center rounded-sm border-[1.5px] border-orange-400 px-2 text-[15px] shadow-sm transition-all hover:bg-orange-400 hover:text-white hover:opacity-90',
              {
                'bg-orange-400 text-white': isActive,
                'bg-white-400 text-black': !isActive
              }
            )}
          >
            {pageNumber}
          </Link>
        )
      })
  }

  return (
    <div className='flex items-end justify-center gap-x-3'>
      {/* Previous Button */}
      {page === 1 ? (
        <span className='bg-white-400 flex h-11 min-w-10 cursor-not-allowed items-center justify-center rounded-sm border-[1.5px] border-orange-400 px-2 text-[15px] text-black shadow-sm'>
          Prev
        </span>
      ) : (
        <Link
          to={{
            pathname: path,
            search: createSearchParams({ ...queryConfig, page: (page - 1).toString() }).toString()
          }}
          className='bg-white-400 flex h-11 min-w-10 items-center justify-center rounded-sm border-[1.5px] border-orange-400 px-2 text-[15px] text-black shadow-sm transition-all hover:bg-orange-400 hover:text-white hover:opacity-90'
        >
          Prev
        </Link>
      )}

      {renderPagination()}

      {/* Next Button */}
      {page === pageSize ? (
        <span className='bg-white-400 flex h-11 min-w-10 cursor-not-allowed items-center justify-center rounded-sm border-[1.5px] border-orange-400 px-2 text-[15px] text-black shadow-sm'>
          Next
        </span>
      ) : (
        <Link
          to={{
            pathname: path,
            search: createSearchParams({
              ...queryConfig,
              page: (page + 1).toString()
            }).toString()
          }}
          className='bg-white-400 flex h-11 min-w-10 items-center justify-center rounded-sm border-[1.5px] border-orange-400 px-2 text-[15px] text-black shadow-sm transition-all hover:bg-orange-400 hover:text-white hover:opacity-90'
        >
          Next
        </Link>
      )}
    </div>
  )
}
