import React from 'react'
import { useSelector } from 'react-redux'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { useNavigate } from 'react-router-dom'

const PostedProjectsTable = () => {
    const navigate= useNavigate();
    const {businessProjects}= useSelector(store=>store.project)
  return (
    <div>
        <Table>
            <TableCaption>A list of your recent posted projects</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    businessProjects?.map((project)=>(
                        <tr onClick={()=>navigate(`/${project._id}/applicants`)}>

                            <TableCell>{project.title}</TableCell>
                            <TableCell>{project.description}</TableCell>
                            <TableCell>{project.duration}</TableCell>
                            <TableCell>{project.budget}</TableCell>
                            <TableCell>{project.status}</TableCell>
                        </tr>
                    ))
                }
            </TableBody>
        </Table>
    </div>
  )
}

export default PostedProjectsTable