export interface Response<Data> {
  items: Data[]
  pagination: {
    totalItems: number
    totalItemsPerPage: number
    currentPage: number
    totalPages: number
  }
  status: boolean
}

export interface ResponseFilter<Data> {
  data: {
    items: Data[]
    pagination: {
      totalItems: number
      totalItemsPerPage: number
      currentPage: number
      totalPages: number
    }
    status: boolean
  }
}
