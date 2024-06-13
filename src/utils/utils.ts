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
