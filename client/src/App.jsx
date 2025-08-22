import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Dashboard from './pages/dashboard'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Overview from './component/overview'
import Stores from './component/stores'
import Users from './component/users'
import Home from './pages/home'
import UserDashboard from './pages/userDashboard'
import StoreDashboard from './pages/storeDashboard'



function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/dashboard' element={<Dashboard/>}>
          <Route index element={<Navigate to="/dashboard/overview"/>}/>
          <Route path='/dashboard/overview' element={<Overview/>}/>
          <Route path='/dashboard/stores' element={<Stores/>}/>
          <Route path='/dashboard/users' element={<Users/>}/>
        </Route>
        <Route path='/userdashboard' element={<UserDashboard/>}/>
        <Route path='/stores' element={<StoreDashboard/>}/>
        
      </Routes>
    </>
  )
}

export default App
