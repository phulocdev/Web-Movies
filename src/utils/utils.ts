import { theme } from '~/constants/config'
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

export const addClassNameButtonsSlider = () => {
  const prevButtonSliderList = document.querySelectorAll('.swiper-button-prev') as NodeListOf<HTMLElement>
  const nextButtonSliderList = document.querySelectorAll('.swiper-button-next') as NodeListOf<HTMLElement>

  ;[...prevButtonSliderList, ...nextButtonSliderList].forEach((button) => {
    button.classList.add(
      'text-black',
      'text-center',
      'flex',
      'items-center',
      'bg-white',
      'dark:text-white',
      'dark:bg-slate-900',
      'hover:bg-slate-100',
      'dark:hover:bg-slate-800',
      'rounded-full',
      'md:w-12',
      'md:h-12',
      'w-10',
      'h-10',
      'sm:flex',
      'hidden'
    )
  })
}

export const setDefaultTheme = () => {
  document.body.classList.add('dark:bg-slate-950', 'relative')
  if (
    localStorage.theme === theme.dark ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    // documentElement is HTML node
    document.documentElement.classList.add(theme.dark)
  }
}

export const getCurrentTheme = () => {
  if ('theme' in localStorage) {
    return localStorage.theme
  }
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return theme.dark
  }
  return theme.light
}
