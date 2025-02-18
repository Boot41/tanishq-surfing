import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { organizationService } from '../services/organizationService';

export default function Register() {
  const navigate = useNavigate();
  const [organizations, setOrganizations] = useState([]);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    employeeType: 'intern',
    department: '',
    position: '',
    organizationId: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const orgs = await organizationService.getAll();
        setOrganizations(orgs);
        if (orgs.length > 0) {
          setFormData(prev => ({ ...prev, organizationId: orgs[0].id }));
        }
      } catch (err) {
        console.error('Failed to fetch organizations:', err);
      }
    };
    fetchOrganizations();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.register(formData);
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(response.employee));
      // Redirect to dashboard
      console.log(formData)
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-orange-500">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-zinc-700 bg-zinc-800 text-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-zinc-700 bg-zinc-800 text-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-zinc-700 bg-zinc-800 text-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-300">First Name</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-zinc-700 bg-zinc-800 text-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-300">Last Name</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-zinc-700 bg-zinc-800 text-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="employeeType" className="block text-sm font-medium text-gray-300">Employee Type</label>
              <select
                id="employeeType"
                name="employeeType"
                required
                className="mt-1 block w-full px-3 py-2 border border-zinc-700 bg-zinc-800 text-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                value={formData.employeeType}
                onChange={handleChange}
              >
                <option value="intern">Intern</option>
                <option value="full_time">Full Time</option>
              </select>
            </div>

            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-300">Department</label>
              <input
                id="department"
                name="department"
                type="text"
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-zinc-700 bg-zinc-800 text-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                value={formData.department}
                onChange={handleChange}
                placeholder="Optional"
              />
            </div>

            <div>
              <label htmlFor="position" className="block text-sm font-medium text-gray-300">Position</label>
              <input
                id="position"
                name="position"
                type="text"
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-zinc-700 bg-zinc-800 text-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                value={formData.position}
                onChange={handleChange}
                placeholder="Optional"
              />
            </div>

            <div>
              <label htmlFor="organizationId" className="block text-sm font-medium text-gray-300">Organization</label>
              <select
                id="organizationId"
                name="organizationId"
                required
                className="mt-1 block w-full px-3 py-2 border border-zinc-700 bg-zinc-800 text-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                value={formData.organizationId}
                onChange={handleChange}
              >
                {organizations.map(org => (
                  <option key={org.id} value={org.id}>{org.name}</option>
                ))}
              </select>
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-orange-500 hover:text-orange-400 text-sm"
            >
              Already have an account? Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
