import React from 'react'
import { useSelector } from 'react-redux'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { MoreHorizontal } from 'lucide-react'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
const shortlistingStatus = ["Accepted","Rejected"];

const ApplicantTable = () => {
    const {applicants}= useSelector(store=>store.applicant)
    const statusHandler = async (status,id) =>{
        try {
            axios.defaults.withCredentials=true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`,{status});
            if(res.data.success){
                console.log(res.data.message);
                
            }  
        } catch (error) {
            console.log(error);
            
        }
    }
  return (
    <div>
        <Table>
            <TableCaption>A list of your recent applied Students</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Full Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Resume</TableHead>
                    <TableHead>Projects Link</TableHead>
                    <TableHead className='text-right'>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    applicants && applicants?.applications?.map((item)=>(
                        <tr key={item._id}>
                            <TableCell>{item?.applicant?.fullName}</TableCell>
                            <TableCell>{item?.applicant?.email}</TableCell>
                            <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                            <TableCell>{
                                    item?.applicant?.profile?.resume ? <a  className='text-blue-600 cursor-pointer' href={item?.applicant?.profile?.resume} target="_blank">{item?.applicant?.profile?.resumeOriginalName }</a> : <span>NA</span>
                                }</TableCell>
                            <TableCell>
                            {item?.applicant?.profile?.projectsLink?.length > 0 ? (
    item?.applicant?.profile?.projectsLink.map((link, index) => {
      // Ensure URLs have proper protocol
      const url = link.startsWith('http://') || link.startsWith('https://')
        ? link
        : `https://${link}`;
      
      return (
        <div key={index} className="mb-1">
          <a 
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {link}
          </a>
        </div>
      );
    })
  ) : (
    <span>NA</span>
  )}                            </TableCell>
                            <TableCell className='float-right cursor-pointer'>
                                <Popover>
                                    <PopoverTrigger>
                                        <MoreHorizontal/>
                                    </PopoverTrigger>
                                    <PopoverContent className='w-32'>
                                    {
                                    shortlistingStatus.map((status, index)=>{
                                        return (
                                            <div onClick={()=> statusHandler(status,item?._id)} key={index} className='flex w-fit items-center my-2 cursor-pointer'>
                                                <span>{status}</span>
                                            </div>
                                        )
                                    })}
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </tr>
                    ))
                } 
            </TableBody>
        </Table>
    </div>
  )
}

export default ApplicantTable