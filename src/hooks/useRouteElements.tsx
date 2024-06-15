import Home from '../pages/Home'
import FilmDetail from '../pages/FilmDetail'
import MainLayout from '../layouts/MainLayout'
import NotFound from '../pages/NotFound'
import FilmFilter from '../pages/FilmFilter'
import { useRoutes } from 'react-router-dom'
import path from '~/constants/path'
import SearchResult from '~/pages/SearchResult'

export default function useRouteElements() {
  const router = useRoutes([
    {
      path: path.home,
      element: (
        <MainLayout>
          <Home />
        </MainLayout>
      )
    },
    {
      path: `${path.filmDetail}/:nameSlug`,
      element: (
        <MainLayout>
          <FilmDetail />
        </MainLayout>
      )
    },
    {
      // typeCategory: 'danh-sach' or 'quoc-gia' or 'the-loai'
      // categorySlug: 'phim-bo' or 'trung-quoc' or 'hai-huoc'
      path: '/filter/:typeCategory/:categorySlug',
      element: (
        <MainLayout>
          <FilmFilter />
        </MainLayout>
      )
    },
    {
      path: path.search,
      element: (
        <MainLayout>
          <SearchResult />
        </MainLayout>
      )
    },
    {
      path: '/*',
      element: (
        <MainLayout>
          <NotFound />
        </MainLayout>
      )
    }
  ])
  return router
}
