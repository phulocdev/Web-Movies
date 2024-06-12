import { FilmHot } from '~/types/FilmHot'
import FilmFiltered, { ParamsFilmFilterd } from '~/types/FilmSeries'
import { Response, ResponseFilter } from '~/types/Response'
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
  }
}

export default filmListApi
