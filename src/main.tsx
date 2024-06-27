import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'

// export const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: false,
//       retry: false
//     }
//   }
// })

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <QueryClientProvider client={queryClient}>
//         <App />
//         <ScrollToTop />
//         <ReactQueryDevtools initialIsOpen={false} />
//       </QueryClientProvider>
//     </BrowserRouter>
//   </React.StrictMode>
// )

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
