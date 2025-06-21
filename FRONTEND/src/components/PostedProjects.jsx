import React from 'react'
import Navbar from './shared/navbar'
import Footer from './shared/Footer'
import useGetBusinessProjects from './hooks/useGetBusinessProjects'
import PostedProjectsTable from './PostedProjectsTable'

const PostedProjects = () => {
    useGetBusinessProjects();
  return (
    <div className="bg-[#F8F6F4] min-h-screen flex flex-col">
        <Navbar/>
        <div className='flex-grow'>

          <PostedProjectsTable/>
        </div>
        <Footer/>
    </div>
  )
}

export default PostedProjects