import {  setBusinessProjects } from '@/redux/projectSlice';
import { PROJECT_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetBusinessProjects = () => {
    const dispatch = useDispatch();
    const {user} = useSelector(store=>store.auth);
    
    useEffect(()=>{
        const fetchBusinessProjects = async()=>{
            try {
                const res = await axios.post(`${PROJECT_API_END_POINT}/get/business/projects`,{businessId:user._id},{withCredentials:true});
                if(res.data.success){
                    dispatch(setBusinessProjects(res.data.projects))
                    console.log(res.data.projects);
                    
                }
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchBusinessProjects();
    },[user._id])
}

export default useGetBusinessProjects