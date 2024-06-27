import { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { AppContext } from '~/context/app.context'

export default function ScrollToTop() {
  const { setOpenMenu } = useContext(AppContext)
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    setOpenMenu(false)
  }, [pathname, setOpenMenu])

  return null
}
