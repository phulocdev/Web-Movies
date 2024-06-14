import Category from './Category'
import Country from './Country'

export default interface Film {
  created: {
    time: string
  }
  modified: {
    time: string
  }
  _id: string
  name: string
  slug: string
  origin_name: string
  content: string
  type: string
  status: string
  poster_url: string
  thumb_url: string
  is_copyright: boolean
  sub_docquyen: boolean
  chieurap: boolean
  trailer_url: string
  time: string
  episode_current: string
  episode_total: string
  quality: string
  lang: string
  notify: string
  showtimes: string
  year: number
  view: number
  actor: string[]
  director: string[]
  category: Category[]
  country: Country[]
}

export type FilmHot = Pick<
  Film,
  'modified' | '_id' | 'name' | 'slug' | 'origin_name' | 'poster_url' | 'thumb_url' | 'year'
>

export type FilmFiltered = Pick<
  Film,
  | 'modified'
  | '_id'
  | 'name'
  | 'slug'
  | 'origin_name'
  | 'type'
  | 'poster_url'
  | 'thumb_url'
  | 'year'
  | 'sub_docquyen'
  | 'chieurap'
  | 'time'
  | 'episode_current'
  | 'quality'
  | 'lang'
  | 'category'
  | 'country'
>

export interface FilmParamsConfig {
  page?: number | string
  limit?: number | string
  keyword?: string
}
