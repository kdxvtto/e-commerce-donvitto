import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { ProductPages } from './pages/ProductPages'
import { AboutPage } from './pages/AboutPage'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { CheckoutPage } from './pages/CheckoutPage'

// Definisikan semua rute halaman aplikasi
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/product",
    element: <ProductPages />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/checkout",
    element: <CheckoutPage />,
  },
])

// Render root React dengan Redux Provider dan Router
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
