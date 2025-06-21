import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PROJECT_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import Navbar from './shared/navbar';
import Footer from './shared/Footer';

const PostProject = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { loading } = useSelector(state => state.auth);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    budget: '',
    specificTechStack: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    try {
      const response = await axios.post(`${PROJECT_API_END_POINT}/post`, {
        ...formData,
        budget: Number(formData.budget),
        businessId: user._id
      }, {
        withCredentials: true
      });

      if (response.data.success) {
        navigate('/posted/projects');
      }
    } catch (error) {
      console.log(error.response?.data?.message || 'Project posting failed');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
        <Navbar/>
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6 md:p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Post a New Project</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Project Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="E.g., E-commerce Website Development"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Project Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Describe your project requirements, goals, and specifications in detail..."
                />
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                    Project Duration
                  </label>
                  <select
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="">Select duration</option>
                    <option value="Less than a week">Less than a week</option>
                    <option value="1-2 weeks">1-2 weeks</option>
                    <option value="2-4 weeks">2-4 weeks</option>
                    <option value="1-3 months">1-3 months</option>
                    <option value="3-6 months">3-6 months</option>
                    <option value="6+ months">6+ months</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
                    Budget 
                  </label>
                  <input
                    type="number"
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                    min="0"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter budget amount"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="specificTechStack" className="block text-sm font-medium text-gray-700">
                  Specific Technologies Required (comma-separated)
                </label>
                <input
                  type="text"
                  id="specificTechStack"
                  name="specificTechStack"
                  value={formData.specificTechStack}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="E.g., React, Node.js, MongoDB, Express"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Enter the technologies required for this project, separated by commas
                </p>
              </div>

              <div className="flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                >
                  {loading ? 'Posting...' : 'Post Project'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default PostProject;