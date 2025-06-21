import React from 'react'
import Navbar from './shared/navbar'
import HeroSection from './HeroSection'
import LatestProjects from './LatestProjects'
import Footer from './shared/Footer'
import useGetAllProjects from './hooks/useGetAllProjects'
import { useSelector } from 'react-redux'

const Home = () => {
  useGetAllProjects();    
  return (
    <div className="bg-[#F8F6F4] text-center">
        <Navbar/>
        <HeroSection/>
        <LatestProjects/>
        <Footer/>
    </div>
  )
}

export default Home