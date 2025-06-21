import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BUSINESS_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';

const BusinessSignup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector(store => store.auth);
  
  const [formData, setFormData] = useState({
    companyName: '',
    phoneNumber: '',
    email: '',
    password: '',
    website: '',
    location: '',
    description: ''
  });
  
  const [logo, setLogo] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    try {
      const data = new FormData();
      data.append('companyName', formData.companyName);
      data.append('phoneNumber', formData.phoneNumber);
      data.append('email', formData.email);
      data.append('password', formData.password);
      data.append('website', formData.website);
      data.append('location', formData.location);
      data.append('description', formData.description);
      data.append('file', logo);

      const response = await axios.post(`${BUSINESS_API_END_POINT}/register`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        navigate('/login');
      }
    } catch (error) {
      console.log(error.response?.data?.message || 'Business registration failed. Please try again.');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-6 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Register Your Business
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/business/login" className="font-medium text-blue-600 hover:text-blue-500">
              sign in to your business account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                Company Name
              </label>
              <input
                id="companyName"
                name="companyName"
                type="text"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Company Name"
                value={formData.companyName}
                onChange={handleChange}
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
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
            
            <div className="mb-4">
              <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                Company Website
              </label>
              <input
                id="website"
                name="website"
                type="text"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Website URL"
                value={formData.website}
                onChange={handleChange}
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Business Location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Company Description
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows="4"
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Tell us about your company"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="logo" className="block text-sm font-medium text-gray-700">
                Company Logo
              </label>
              <input
                id="logo"
                name="logo"
                type="file"
                accept="image/*"
                required
                className="mt-1 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              {loading ? 'Registering...' : 'Register Business'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BusinessSignup;