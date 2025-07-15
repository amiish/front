import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

 






const routerProvider = createBrowserRouter([

  {
    path: "/",
    element: < App />,

  },
   
  
])





createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routerProvider}/>
  </StrictMode>,
)