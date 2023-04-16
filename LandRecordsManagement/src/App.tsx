import './App.scss'
import { Routes, Route } from 'react-router-dom'

import { HomeScreen, Dashboard } from './pages'

import React, { useEffect, useContext } from "react";
import LoginContext from './contexts/LoginContext';
import ProtectedRoute from './components/common/ProtectedRoutes';

function App() {

  const { updateMetaMask, accounts, isAuthenticated } = useContext(LoginContext);

  useEffect(() => {
    updateMetaMask();
  }, [])


  return (
    <Routes>
      <Route path='/' element={<HomeScreen />} />
      <Route
        path="/dashboard" element={<ProtectedRoute redirectPath="/"
          isAuthenticated={isAuthenticated}
          children={<Dashboard />} />}
      />
    </Routes>
  )
}

export default App
