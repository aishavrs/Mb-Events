import React from 'react'
import './App.css'
import SignUpPage from './Pages/SignUpPage'
import SignInPage from './Pages/SignInPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

export default function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/sign-in' element={<SignInPage/>}/>
      <Route path='/sign-up' element={<SignUpPage/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}
