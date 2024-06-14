import { FilmFiltered, FilmHot, FilmParamsConfig } from '~/types/Film'
import { Response, ResponseFilmDetail, ResponseFilter } from '~/types/Response'
import { http, httpFilter } from '~/utils/http'

const filmListApi = {
  getHotFilms: () => {
    return http.get<Response<FilmHot>>('/danh-sach/phim-moi-cap-nhat')
  },

  getFilmList: (typeCategory: string, nameCategory: string, params: FilmParamsConfig) => {
    return httpFilter.get<ResponseFilter<FilmFiltered>>(`/${typeCategory}/${nameCategory}`, {
      params
    })
  },

  getFilmDetail: (slug: string) => {
    return http.get<ResponseFilmDetail>(`/phim/${slug}`)
  }
}

export default filmListApi
