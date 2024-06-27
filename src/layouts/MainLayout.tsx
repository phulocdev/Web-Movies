import React, { ReactNode } from 'react'
import Footer from '~/components/Footer'
import Header from '~/components/Header'

interface Props {
  children?: ReactNode
}

export default function MainLayout({ children }: Props) {
  return (
    <React.Fragment>
      <Header />
      <div className='container mb-10 mt-7 min-h-screen'>{children}</div>
      <Footer />
    </React.Fragment>
  )
}
