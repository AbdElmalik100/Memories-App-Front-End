import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import { store } from './store'
import { Provider } from 'react-redux'
import axios from 'axios'
import { Toaster } from 'sonner'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { NextUIProvider } from '@nextui-org/react'




axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_URL
if (localStorage.getItem("UTK")) axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem("UTK")}`



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <Toaster closeButton richColors />
        <NextUIProvider>
          <App />
        </NextUIProvider>
      </GoogleOAuthProvider>
    </Provider>
  </StrictMode >,
)
