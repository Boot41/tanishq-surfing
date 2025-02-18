import { useState, useEffect } from 'react';
import { assignmentService } from '../services/assignmentService';
import { employeeService } from '../services/employeeService';
import { authService } from '../services/authService';

export default function CreateAssignment({ onClose, onSuccess }) {
  const currentUser = authService.getCurrentUser();
  const [employees, setEmployees] = useState([]);
  console.log(currentUser);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    employee_id: '',
    organizationId: currentUser.employee.organization.id
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await employeeService.getAll();
        setEmployees(data);
        if (data.length > 0) {
          setFormData(prev => ({ ...prev, employeeId: data[0].id }));
        }
      } catch (err) {
        console.error('Failed to fetch employees:', err);
        setError('Failed to load employees');
      }
    };
    fetchEmployees();
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
      // First create the assignment
      const assignment = await assignmentService.create({
        title: formData.title,
        description: formData.description,
        deadline: formData.deadline,
        organization_id: formData.organizationId,
        employee_id: formData.employeeId
      });

      // Then create the employee assignment
      await assignmentService.assignToEmployee(assignment.id, formData.employeeId);

      onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create assignment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-zinc-900 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-orange-500 mb-6">Create New Assignment</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              required
              className="mt-1 block w-full px-3 py-2 border border-zinc-700 bg-zinc-800 text-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300">Description</label>
            <textarea
              id="description"
              name="description"
              required
              rows="3"
              className="mt-1 block w-full px-3 py-2 border border-zinc-700 bg-zinc-800 text-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="deadline" className="block text-sm font-medium text-gray-300">Deadline</label>
            <input
              type="datetime-local"
              id="deadline"
              name="deadline"
              required
              className="mt-1 block w-full px-3 py-2 border border-zinc-700 bg-zinc-800 text-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              value={formData.deadline}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="employeeId" className="block text-sm font-medium text-gray-300">Assign To</label>
            <select
              id="employeeId"
              name="employeeId"
              required
              className="mt-1 block w-full px-3 py-2 border border-zinc-700 bg-zinc-800 text-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              value={formData.employeeId}
              onChange={(e)=>{
                handleChange(e)
              }}
            >
              {employees.map(employee => (
                <option key={employee.id} value={employee.id}>
                  {employee.user.first_name} {employee.user.last_name} ({employee.employee_type})
                </option>
              ))}
            </select>
          </div>

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Assignment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
