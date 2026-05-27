import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../auth/Home/Navbar'
import Footer from '../auth/Home/Footer'

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default MainLayout