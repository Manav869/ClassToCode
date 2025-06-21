import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./components/home"
import Signup from "./components/auth/Signup"
import Login from "./components/auth/Login"
import Projects from "./components/Projects"
import Profile from "./components/Profile"
import ProjectDescription from "./components/ProjectDescription"
import BusinessSignup from "./components/BusinessSignup"
import PostedProjects from "./components/PostedProjects"
import Applicants from "./components/Applicants"
import PostProject from "./components/PostProject"

const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/signup',
    element:<Signup/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/projects',
    element:<Projects/>
  },
  {
    path:'/profile',
    element:<Profile/>
  },
  {
    path:'/description/:id',
    element:<ProjectDescription/>
  },
  {
    path:'/business/signup',
    element:<BusinessSignup/>
  },
  {
    path:'/posted/projects',
    element:<PostedProjects/>
  },
  {
    path:'/:id/applicants',
    element:<Applicants/>
  },
  {
    path:'/post/project',
    element:<PostProject/>
  },
])

function App() {

  return (
  <>
    <RouterProvider router = {appRouter}/>
  </>
  )
}

export default App
