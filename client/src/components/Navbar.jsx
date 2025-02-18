import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  const isActive = (path) => {
    return location.pathname === path ? 'bg-blue-700' : '';
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
    window.location.reload(); 
  };

  return (
    <nav className="bg-orange-600 p-4 shadow-lg">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className={`text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-orange-700 hover:scale-105 transform transition-all duration-200 ${isActive('/') ? 'bg-orange-700' : ''}`}
          >
            Employees
          </Link>
          <Link
            to="/assignments"
            className={`text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-orange-700 hover:scale-105 transform transition-all duration-200 ${isActive('/assignments') ? 'bg-orange-700' : ''}`}
          >
            Assignments
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-white text-sm">
            <span className="font-medium">{user?.user?.first_name} {user?.user?.last_name}</span>
            <span className="mx-2">|</span>
            <span className="text-orange-200">{user?.employee.employee_type === 'full_time' ? 'Full Time' : 'Intern'}</span>
          </div>
          <button
            onClick={handleLogout}
            className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-orange-700 hover:scale-105 transform transition-all duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
