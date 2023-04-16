import './App.scss'
import { Routes, Route } from 'react-router-dom'

import { HomeScreen, Dashboard } from './pages'

import React, { useEffect, useContext } from "react";

import LoginProvider from './contexts/LoginProvider.jsx';
import LoginContext from './contexts/LoginContext';

function App() {

  const {updateMetaMask , accounts } = useContext(LoginContext);

  useEffect(()=>{
    updateMetaMask();
  },[])


  useEffect(()=>{
    console.log(accounts);
  }, [accounts]);
  return (
    <Routes>
      <Route path='/' element={<HomeScreen />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
  )
}

export default App
