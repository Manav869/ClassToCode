import React, { useState } from 'react'
import useGetAllAppliedProjects from './hooks/useGetAllAppliedProjects'
import { useSelector } from 'react-redux';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import Navbar from './shared/navbar';
import AppliedProjectTable from './AppliedProjectTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { Link } from 'react-router-dom';

const isResume = true;

const Profile = () => {
  const [open, setOpen] = useState(false);
  const {user}= useSelector(store=>store.auth)
  return (
    <div>
      <Navbar/>
    <div className="max-w-4xl mx-auto bg-white border border-gary-200 rounded-2xl my-5 p-8">
        <div className='flex justify-between'>
          <div className='flex item-center gap-4'>
            <Avatar className='h-24 w-24'>
              <AvatarImage 
                src={user?.profile?.profilePhoto}
                alt="https://github.com/shadcn.png"              />
            </Avatar>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="text-right"
            variant="outline"
          >
            <Pen />
          </Button>
        </div>
        <div>
              <h1 className='font-medium text-xl'>{user?.fullname}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div className="my-5">
          <h1>Skills</h1>
          <div className="flex items-center gap-1">
            {user?.profile?.skills.length != 0 ? (
              user?.profile?.skills.map((item, index) => (
                <Badge className="bg-black text-white" key={index}>
                  {item}
                </Badge>
              ))
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
        <div className='my-5'>
          <h1>Project Links</h1>
            <div className='flex items-center gap-1'>
            {user?.profile?.projectsLink.length != 0 ? (
              user?.profile?.projectsLink.map((item, index) => (
                <a target='blank'  className="text-blue-500  hover:underLine cursor-pointer"
                href={item} key={index}>
                  {item}
                </a>
              ))
            ) : (
              <span>NA</span>
            )}
            </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md font-bold">Resume</Label>
          {isResume ? (
            <a
              target="blank"
              href={user?.profile?.resume}
              className="text-blue-500 w-full hover:underLine cursor-pointer"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
    </div>
    <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
        <AppliedProjectTable />
    </div>
    <UpdateProfileDialog open={open} setOpen={setOpen} />


    </div>
  )
}

export default Profile