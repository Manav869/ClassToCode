import React from 'react'
import useGetAllAppliedProjects from './hooks/useGetAllAppliedProjects'
import { useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

const AppliedProjectTable = () => {
  useGetAllAppliedProjects();
  const {allAppliedProjects} = useSelector(store=>store.project);
  return (
    <div>
      <Table>
      <TableHeader>
                <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead className='text-right'>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
              {
                allAppliedProjects?.length <=0 ? <span>No Applied Projects</span> : allAppliedProjects?.map((appliedProject)=>(
                  <TableRow key={appliedProject._id}>
                    <TableCell>{appliedProject?.project?.title}</TableCell>
                    <TableCell>{appliedProject?.project?.business?.companyName}</TableCell>
                    <TableCell className='text-right'>{appliedProject?.status}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>

      </Table>
    </div>
  )
}

export default AppliedProjectTable