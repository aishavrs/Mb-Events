import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'

export default function AppLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* allow children to shrink/scroll correctly inside a column flex */}
      <main className="flex-1 min-h-0 overflow-y-auto">
        {children}
      </main>

      <Footer />
    </div>
  )
}
