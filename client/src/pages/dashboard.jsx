import React from 'react'
import Sidebar from '../component/sidebar'
import { Outlet, useLocation } from 'react-router-dom'

export default function dash() {
  const location = useLocation();
  const LoggedUser = location.state;  
  return (
    <div className='flex h-s'>
        <Sidebar/>
        <Outlet user={LoggedUser}/>
    </div>
  )
}