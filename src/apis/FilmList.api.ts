import { FilmFiltered, FilmHot, ParamsFilmFilterd } from '~/types/Film'
import { Response, ResponseFilmDetail, ResponseFilter } from '~/types/Response'
import { http, httpFilter } from '~/utils/http'

const filmListApi = {
  getHotFilms: () => {
    return http.get<Response<FilmHot>>('/danh-sach/phim-moi-cap-nhat')
  },

  getSeriesFilms: (params: ParamsFilmFilterd) => {
    return httpFilter.get<ResponseFilter<FilmFiltered>>('/danh-sach/phim-bo', {
      params
    })
  },

  getSingleFilms: (params: ParamsFilmFilterd) => {
    return httpFilter.get<ResponseFilter<FilmFiltered>>('/danh-sach/phim-le', {
      params: params
    })
  },

  getCartoonFilms: (params: ParamsFilmFilterd) => {
    return httpFilter.get<ResponseFilter<FilmFiltered>>('/danh-sach/hoat-hinh', {
      params
    })
  },

  getTvShows: (params: ParamsFilmFilterd) => {
    return httpFilter.get<ResponseFilter<FilmFiltered>>('/danh-sach/tv-shows', {
      params
    })
  },

  getFilmDetail: (slug: string) => {
    return http.get<ResponseFilmDetail>(`/phim/${slug}`)
  }
}

export default filmListApi
