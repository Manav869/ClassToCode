import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Loader2 } from 'lucide-react'
import { Button } from './ui/button'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import {STUDENT_API_END_POINT} from '../utils/constant'
import { setUser } from '../redux/authSlice'

const UpdateProfileDialog = ({ open , setOpen }) => {
    const [loading , setLoading] = useState(false);
    const {user} = useSelector(store=>store.auth);

    const[input, setInput] = useState({
        fullName:user?.fullName || "",
        email:user?.email || "",
        phoneNumber:user?.phoneNumber || "",
        bio:user?.profile?.bio || "",
        skills:user?.profile?.skills?.map(skill=>skill) || "",
        file:user?.profile?.resume || "",
        projectsLink:user?.profile?.projectsLink || "",

    });
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({...input,[e.target.name]:e.target.value});
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({...input,file})
    }
    const submitHandler = async (e) => {
        console.log(input._id);
        
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullName", input.fullName);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        formData.append("id",user._id);
        formData.append("projectsLink",input.projectsLink);
        if(input.file){
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.post(`${STUDENT_API_END_POINT}/profile/update`, formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                },
                withCredentials:true
            });
            if(res.data.success){
                dispatch(setUser(res.data.user));
            }
        } catch (error) {
            console.log(error);
        } finally{
            setLoading(false);
        }
        setOpen(false);
        console.log(input);
    }


  return (
    <div>
        <Dialog open = {open}>
            <DialogContent className='sm:max-w-[425px]' onInteractOutside={() => setOpen(false)}>
                <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                </DialogHeader>
                <form onSubmit={submitHandler}>
                    <div className='grid gap-4 py-4'>
                        <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='name' className='text-right'>Name</Label>
                        <Input id='fullName'
                        name='fullName'
                        type="text"
                        value={input.fullName}
                        onChange={changeEventHandler}
                        className='col-span-3'
                        />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='email' className='text-right'>Email</Label>
                        <Input id='email'
                        name='email'
                        value={input.email}
                        type="email"
                        onChange={changeEventHandler}
                        className='col-span-3'
                        />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='number' className='text-right'>Number</Label>
                        <Input id='number'
                        name='number'
                        value={input.phoneNumber}
                        onChange={changeEventHandler}
                        className='col-span-3'
                        />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='bio' className='text-right'>Bio</Label>
                        <Input id='bio'
                        name='bio'
                        value={input.bio}
                        onChange={changeEventHandler}
                        className='col-span-3'
                        />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='skills' className='text-right'>Skills</Label>
                        <Input id='skills'
                        name='skills'
                        value={input.skills}
                        onChange={changeEventHandler}
                        className='col-span-3'
                        />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='projectsLink' className='text-right'>Project Links</Label>
                        <Input id='projectsLink'
                        name='projectsLink'
                        value={input.projectsLink}
                        onChange={changeEventHandler}
                        className='col-span-3'
                        />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='file' className='text-right'>Resume</Label>
                        <Input id='file'
                        name='file'
                        type='file'
                        accept='application/pdf'
                        onChange={fileChangeHandler}
                        className='col-span-3'
                        />
                        </div>
                    </div>
                    <DialogFooter>
                        {
                            loading ? <Button className="w-full my-4 bg-[#000000] text-white"> <Loader2 className='mr-2 h-4 w-4 animate-spin'/> Please wait </Button> :  <Button type="submit" className='w-full my-4 bg-[#000000] text-white'>Update</Button>
                        }
                    </DialogFooter>
                </form>
            </DialogContent>

        </Dialog>
    </div>
  )
}

export default UpdateProfileDialog