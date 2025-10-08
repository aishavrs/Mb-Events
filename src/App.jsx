import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUpPage from './Pages/SignUpPage'
import SignInPage from './Pages/SignInPage'
import ForgotPassword from './Pages/ForgotPassword'
import ResetPassword from './Pages/ResetPassword'
import YourInterests from './Pages/YourInterests'
import Header from './Components/Header'
import SecondHeader from './Components/Header'
import Footer from './Components/Footer'
import SingleEvent from './Components/SingleEvent'
import AllEvents from './Components/AllEvents'
import HeroSection from './Components/HeroSection'
import HomePage from './Pages/HomePage'
import EventPage from './Pages/EventPage'
import EventDetails from './Pages/EventDetails'
import Error from './Pages/Error'
import CreateEvent from './Pages/CreateEvent'
import ComingSoon from './Components/ComingSoon'
import ProtectRoute from './Components/ProtectRoute'
import YourEvents from './Pages/YourEvents'
import Profile from './Pages/Profile'
import AboutPage from './Pages/AboutPage'
import ContactPage from './Pages/ContactPage'
import AllCategoriesPage from './Pages/AllCategoriesPage'
import CategoryPage from './Pages/CategoryPage';



export default function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/sign-in' element={<SignInPage/>}/>
      <Route path='/sign-up' element={<SignUpPage/>}/>
      <Route path='/forgot-password' element={<ForgotPassword/>}/>
      <Route path='/reset-password/:token' element={<ResetPassword/>}/>
      <Route path='/your-interests' element={<YourInterests/>}/>
      <Route path='/header' element={<Header/>}/>
      <Route path='/second-header' element={<SecondHeader/>}/>
      <Route path='/footer' element={<Footer/>}/>
      <Route path='/single-event' element={<SingleEvent/>}/>
      <Route path='/all-events' element={<AllEvents/>}/>
      <Route path='/hero' element={<HeroSection/>}/>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/event' element={<ProtectRoute><EventPage/></ProtectRoute>}/>
      <Route path='*' element={<Error/>}/>
      <Route path="/event/:id" element={<EventDetails/>} />
      <Route path="/create-event" element={<ProtectRoute><CreateEvent/></ProtectRoute>} />
      <Route path="/comingsoon" element={<ComingSoon/>} />
      <Route path="/yourevents" element={<ProtectRoute><YourEvents/></ProtectRoute>} />
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/about" element={<AboutPage/>}/>
      <Route path="/contact" element={<ContactPage/>}/>
      <Route path="/categories" element={<ProtectRoute><AllCategoriesPage/></ProtectRoute>}/>
      <Route path="/categories/:categoryName" element={<CategoryPage />} />



    </Routes>
    </BrowserRouter>
    </>
  )
}
