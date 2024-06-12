import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import FilmDetail from './pages/FilmDetail'
import MainLayout from './layouts/MainLayout'

export default function userRoutesElement() {
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
      path: '/film-detail',
      element: (
        <MainLayout>
          <FilmDetail />
        </MainLayout>
      )
    }
  ])
  return {
    router
  }
}
