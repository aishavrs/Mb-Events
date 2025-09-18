import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
// import HeroSection from '../Components/HeroSection'

export default function AppLayout({children}) {
  return (
    <div>
        <Header/>
            {children}
        <Footer/>
    </div>
  )
}
