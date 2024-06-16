import { FilmFiltered } from '~/types/Film'

export const getQuantityOfFilms = (width: number) => {
  if (width >= 1380) return 6
  if (width >= 1290) return 5
  if (width >= 992) return 4
  if (width >= 578) return 3
  return 2
}

export const getImageUrl = (url: string) => {
  return `https://img.phimapi.com/${url}`
}

export const isDontNeedFilmText = (name: string) => {
  return name === 'phim bộ' || name === 'phim lẻ' || name === 'phim hoạt hình' || name === 'tv shows'
}

export const getFavouriteFilmList = (): FilmFiltered[] => JSON.parse(localStorage.getItem('films_favourite') || '[]')

export const saveFilmToFavouriteList = (film: FilmFiltered) => {
  const oldFilmsFavouriteValue: FilmFiltered[] = getFavouriteFilmList()
  localStorage.setItem('films_favourite', JSON.stringify(oldFilmsFavouriteValue.concat([film])))
}
