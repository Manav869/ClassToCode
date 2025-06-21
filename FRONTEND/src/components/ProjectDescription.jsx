import { setSingleProject } from '@/redux/projectSlice';
import { APPLICATION_API_END_POINT, PROJECT_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { Button } from './ui/button';

const ProjectDescription = () => {
    const params = useParams();
    const projectId = params.id;
    const {user} = useSelector(store=>store.auth);
    const {singleProject} = useSelector(store=>store.project)
    const isInitiallyApplied = singleProject?.applications?.some(application=>application.applicant == user?._id) || false;
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);
    const dispatch = useDispatch();
    const applyJobHandler = async()=>{
        try {
            const res = await axios.post(`${APPLICATION_API_END_POINT}/apply/${projectId}`,{userId:user._id},{withCredentials:true});
            if(res.data.success){
                setIsApplied(true);
                const updatedSingleProject = {
                    ...singleProject,applications:[...singleProject.applications,{applicant:user?._id}],
                };
                dispatch(setSingleProject(updatedSingleProject));
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    useEffect(()=>{
        const fetchSingleProject = async()=>{
            try {
                const res = await axios.get(`${PROJECT_API_END_POINT}/get/${projectId}`,{withCredentials:true})
                if(res.data.success){
                    dispatch(setSingleProject(res.data.project)); 
                                       
                    setIsApplied(res.data.project.applications.some(application=>application.applicant == user._id))
                }
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchSingleProject();
    },[projectId,dispatch,user?._id]);
        
  return (
    <div className='max-w-7xl mx-auto my-10'>
        <div className='flex items-center justify-between'>
            <div>
                <h1 className='font-bold text-xl'>{singleProject?.title}</h1>
            </div>

        <Button
        disabled={isApplied}
        onClick={isApplied ? null : applyJobHandler}
        className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed': 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}>
            {isApplied ? 'Already Applied': 'Apply Now'}

        </Button>
        </div>
        <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
            Project Description
        </h1>
        <div className='my-4'>
            <h1 className='font-bold my-1'>
                Description:{" "}
                <span className="pl-4 font-normal text-gray-800">
                    {singleProject?.description}
                </span>
            </h1>
            <h1 className='font-bold my-1'>
                Duration:{" "}
                <span className="pl-4 font-normal text-gray-800">
                    {singleProject?.duration}
                </span>
            </h1>
            <h1 className='font-bold my-1'>
                Budget:{" "}
                <span className="pl-4 font-normal text-gray-800">
                    {singleProject?.budget}
                </span>
            </h1>
            <h1 className='font-bold my-1'>
                Total Applicants:{" "}
                <span className="pl-4 font-normal text-gray-800">
                    {singleProject?.applications.length}
                </span>
            </h1>

        </div>

        
    </div>
  )
}

export default ProjectDescription