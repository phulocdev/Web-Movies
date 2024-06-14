import { FilmParamsConfig } from '~/types/Film'
import useQueryParams from './useQueryParams'
import { isUndefined, omitBy } from 'lodash'

// Ta tạo kiểu này vì khi ta lấy query params từ url xuống thì nó là object có cặp key - và value bắt buộc là string
export type QueryConfig = {
  [key in keyof FilmParamsConfig]: string
}

export default function useQueryConfig() {
  const queryParams: QueryConfig = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit || '10',
      keyword: queryParams.keyword
    },
    isUndefined
  )

  return queryConfig
}
