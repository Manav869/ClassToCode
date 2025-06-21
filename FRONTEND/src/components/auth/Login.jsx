import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setLoading, setUser } from '../../redux/authSlice';
import { BUSINESS_API_END_POINT, STUDENT_API_END_POINT } from '@/utils/constant';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [userType, setUserType] = useState('student');


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      dispatch(setLoading(true));
      

      const endpoint = userType === 'student' 
        ? `${STUDENT_API_END_POINT}/login` 
        : `${BUSINESS_API_END_POINT}/login`;
      
      const response = await axios.post(endpoint, formData);
      
      if (response.data.success) {

        if (userType === 'student') {

          dispatch(setUser(response.data.student));
          navigate('/');

          
        } else {
          dispatch(setUser(response.data.business));
          navigate('/posted/projects')
        }
        
   
      }
    } catch (error) {
      console.log(error.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-6 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
              create a new account
            </Link>
          </p>
        </div>

        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <div className="flex justify-center space-x-6 mb-6">
              <div className="flex items-center">
                <input
                  id="student-radio"
                  name="userType"
                  type="radio"
                  value="student"
                  checked={userType === 'student'}
                  onChange={handleUserTypeChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor="student-radio" className="ml-2 block text-sm text-gray-700">
                  Student
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="business-radio"
                  name="userType"
                  type="radio"
                  value="business"
                  checked={userType === 'business'}
                  onChange={handleUserTypeChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor="business-radio" className="ml-2 block text-sm text-gray-700">
                  Business
                </label>
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;