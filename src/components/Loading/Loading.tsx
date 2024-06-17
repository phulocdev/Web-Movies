import { useEffect } from 'react'
import { RingLoader } from 'react-spinners'

export default function Loading() {
  useEffect(() => {
    document.body.classList.add('no-scroll')

    return () => {
      document.body.classList.remove('no-scroll')
    }
  }, [])

  return (
    <div className='fixed inset-0 z-[999] flex items-center justify-center bg-black/70'>
      <RingLoader size={60} color='#ff9800' />
    </div>
  )
}
