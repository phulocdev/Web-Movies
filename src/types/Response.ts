import { Episode } from './Episode'
import Film from './Film'

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
  }
}

export interface ResponseFilmDetail {
  status: boolean
  msg: string
  movie: Film
  episodes: {
    server_name: string
    server_data: Episode[]
  }
}
