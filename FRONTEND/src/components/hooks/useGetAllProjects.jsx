import { setAllProjects } from '@/redux/projectSlice';
import { PROJECT_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllProjects = () => {
    const dispatch = useDispatch();

    
    useEffect(()=>{
        const fetchAllProjects = async()=>{
            try {
                const res = await axios.get(`${PROJECT_API_END_POINT}/get`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setAllProjects(res.data.projects))
                }
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchAllProjects();
    },[])
}

export default useGetAllProjects