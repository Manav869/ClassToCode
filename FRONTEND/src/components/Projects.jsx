import React from "react";
import Navbar from "./shared/navbar";
import { useSelector } from "react-redux";
import LatestProjectCards from '../components/LatestProjectCards'
import Footer from "./shared/Footer";

const Projects = () => {
  const { allProjects } = useSelector((store) => store.project);
    
  return (
    <div className="bg-[#F8F6F4] text-center">
      <Navbar />
       {
        allProjects.length<=0 ? <span>No Jobs avaliable</span>:(<div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
        <div className='grid grid-cols-3 gap-4'>
    {        
        allProjects.map((project) => (
            <div 
            key={project._id} >
                <LatestProjectCards project={project}/>
            </div>
        ))
    }
        </div>

    </div>)
       }
       <Footer/>
    </div>
  );
};

export default Projects;
