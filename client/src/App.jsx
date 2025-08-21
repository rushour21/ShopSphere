import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Dashboard from './pages/dashboard'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Overview from './component/overview'
import Stores from './component/stores'
import Users from './component/users'



function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Dashboard/>}>
          <Route path='/overview' element={<Overview/>}/>
          <Route path='/stores' element={<Stores/>}/>
          <Route path='/users' element={<Users/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
