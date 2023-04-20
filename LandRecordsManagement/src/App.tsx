import './App.scss'
import { Routes, Route } from 'react-router-dom'

import { HomeScreen, Dashboard } from './pages'

import React, { useEffect, useContext } from "react";
import LoginContext from './contexts/LoginContext';
import ProtectedRoute from './components/common/ProtectedRoutes';
import AddRecord from './pages/AddRecord/AddRecord';
import NotFound from './components/NotFound/NotFound';

function App() {

  const { updateMetaMask, accounts, isAuthenticated } = useContext(LoginContext);

  useEffect(() => {
    updateMetaMask();
  }, [])


  return (
    <Routes>
      <Route path='/' element={<HomeScreen />} />
      <Route path='/dashboard/404'  element={<NotFound/>}/>
      <Route
        path="/dashboard/*" element={<ProtectedRoute redirectPath="/"
          isAuthenticated={isAuthenticated}
          children={<Dashboard />} />}>
          
      </Route>
      <Route path= "*" element={<NotFound/>}/>

    </Routes>
  )
}

export default App
