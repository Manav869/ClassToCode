import { setApplicants } from '@/redux/applicantSlice';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import Navbar from './shared/navbar';
import ApplicantTable from './ApplicantTable';

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const {applicants} = useSelector(store=>store.applicant);
    useEffect(()=>{
        const fetchApplicants = async()=>{
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/get`,{withCredentials:true});
                dispatch(setApplicants(res.data.project));
                console.log(res.data.project);
                
            } catch (error) {
                console.log(error);
                
            }

        }
        fetchApplicants();
    },[])
  return (
    <div className='bg-[#F8F6F4]'>
        <Navbar/>
        <div className='max-w-7xl mx-auto'>
        <h1 className='font-bold text-xl my-5'>Applicants ({applicants?.applications?.length || 0})</h1>
        <ApplicantTable/>

        </div>
    </div>
  )
}

export default Applicants