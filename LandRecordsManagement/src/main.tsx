import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Provider } from 'react-router-dom'
import App from './App'
import './index.css'

import LoginProvider from './contexts/LoginProvider.jsx'
import { ProfileProvider } from './contexts/ProfileProvider'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider>
      <LoginProvider>
        <ProfileProvider>
          <App />
        </ProfileProvider>
      </LoginProvider>
    </Provider>
  </React.StrictMode>
)
