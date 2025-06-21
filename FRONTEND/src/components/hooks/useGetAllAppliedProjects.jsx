import { setAllAppliedProjects } from '@/redux/projectSlice';
import { APPLICATION_API_END_POINT, PROJECT_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllAppliedProjects = () => {
    const dispatch = useDispatch();
    const {user}= useSelector(state=>state.auth);
    
    useEffect(()=>{
        const fetchAllAppliedProjects = async()=>{
            try {
                const res = await axios.post(`${APPLICATION_API_END_POINT}/get/projects`,{userId:user._id},{withCredentials:true});
                if(res.data.success){
                    dispatch(setAllAppliedProjects(res.data.projects))                    
                    
                }
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchAllAppliedProjects();
    },[])
}

export default useGetAllAppliedProjects