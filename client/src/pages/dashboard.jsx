import React from 'react'
import Sidebar from '../component/sidebar'
import { Outlet } from 'react-router-dom'

export default function dash() {
  return (
    <div className='flex'>
        <Sidebar/>
        <Outlet/>
    </div>
  )
}