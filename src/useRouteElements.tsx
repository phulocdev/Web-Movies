import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import FilmDetail from './pages/FilmDetail'
import MainLayout from './layouts/MainLayout'
import NotFound from './pages/NotFound'

export default function userRouteElements() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <MainLayout>
          <Home />
        </MainLayout>
      )
    },
    {
      path: '/films/:nameSlug',
      element: (
        <MainLayout>
          <FilmDetail />
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
  return {
    router
  }
}
