import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import { AuthProvider } from './hooks/AuthProvider'
import { CookiesProvider } from "react-cookie";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CookiesProvider>
      <AuthProvider>

        <BrowserRouter>
          <App />
        </BrowserRouter>

      </AuthProvider>
    </CookiesProvider>
  </React.StrictMode>,
)
