import { ReactNode } from 'react'
import Footer from '~/components/Footer'
import Header from '~/components/Header'

interface Props {
  children?: ReactNode
}

export default function MainLayout({ children }: Props) {
  return (
    <div>
      <Header />
      <div className='container mb-5 mt-7 min-h-screen'>{children}</div>
      <Footer />
    </div>
  )
}
