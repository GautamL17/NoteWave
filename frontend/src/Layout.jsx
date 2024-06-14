import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import React from 'react'

const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />  
        </>
    )
}

export default Layout


