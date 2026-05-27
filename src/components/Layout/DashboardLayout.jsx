import React from 'react'
import Sidebar from '../UI/dashboard/Sidebar'
import DashboardHeader from '../UI/dashboard/DashboardHeader'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  return (
     <div className="flex  bg-[#050816] overflow-hidden h-screen">
     <div className=" ">
       <Sidebar  />
     </div>

      <div className="flex flex-col flex-1 min-w-0 ">
        <div className="sticky top-0  z-10 ">
          <DashboardHeader />
        </div>
        <div className="flex-1 overflow-y-auto p-2 overflow-x-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  )
} 

export default DashboardLayout 