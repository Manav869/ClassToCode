import React from "react";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { setUser } from "@/redux/authSlice";
import { BUSINESS_API_END_POINT, STUDENT_API_END_POINT } from "@/utils/constant";
import axios from "axios";

const Navbar = () => {
  const {user} = useSelector(store=>store.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async() => {
    try{
            const endpoint = user?.fullName 
              ? `${STUDENT_API_END_POINT}/logout` 
              : `${BUSINESS_API_END_POINT}/logout`;
              console.log(endpoint);
              
      const res = await axios.get(`${endpoint}`,{withCredentials:true});
      if(res.data.success){
        dispatch(setUser(null));
        navigate("/");
      }
    }
    catch(error){
      console.log(error);
     
    }
  }
  return (
    <div className="bg-[#BFAEAE]">
      <div className="flex item-center justify-between mx-auto max-w-7xl h-16">
        <h1 className="text-2xl font-bold">
          Class<span className="text-[#64748B]">To</span>
          <span className="text-[#9333EA]">Code</span>
        </h1>
        <div className="flex items-center gap-12">
          {
            user?.companyName ?<ul className="flex font-medium items-center gap-5">
            <li><Link to='/posted/projects'>Posted Projects</Link></li>
            <li><Link to='/post/project'>Post Project</Link></li>
          </ul> : (            <ul className="flex font-medium items-center gap-5">
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/projects'>Projects</Link></li>
          </ul>      )
          }
  

          <div>
            {
              !user ?(
                <div className="flex gap-4">
                <Link to='/login'>
                <Button className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6 py-2 rounded-xl shadow-md transition-all duration-300">
                  Login
                </Button>
                </Link>
                <Link to='/signup'>
                <Button className="bg-[#9333EA] hover:bg-[#7E22CE] text-white px-6 py-2 rounded-xl shadow-md transition-all duration-300">
                  Signup
                </Button>
                </Link>
                <Link to='/business/signup'>
                <Button className="bg-[#F97316] hover:bg-[#EA580C] text-white px-6 py-2 rounded-xl shadow-md transition-all duration-300">
                  Business Signup
                </Button>
                </Link>
              </div>
              ):(
                <Popover>
                  <PopoverTrigger asChild>
                    <Avatar className ="cursor-Pointer  border border-blue">
                      <AvatarImage
                        src={ user?.profile?.profilePhoto || user?.profile?.logo}
                        alt="https://github.com/shadcn.png"
                      />
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent className='w-89'>
                    <div className='flex gap-2 space-y-2'>
                      <Avatar className='cursor-Pointer'>
                      <AvatarImage
                        src={ user?.profile?.profilePhoto || user?.profile?.logo}
                        alt="https://github.com/shadcn.png"
                      />
                      </Avatar>
                    </div>
                    <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio || user?.profile?.description}
                    </p>
                  </div>
                    <div className='flex flex-col my-2 text-gray-600'>
                      {
                        user?.fullName && (                  
                        <div className="flex w-fit items-center gap-2 cursor-pointer">
                          <User2 />
                          <Button variant="link"><Link to='/profile'>View Profile</Link></Button>
                        </div>)
                      }
                    </div>
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link">Logout</Button>
                  </div>
        

                  </PopoverContent>
                </Popover>
              )
            }
        
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar
