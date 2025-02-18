import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import EmployeeList from './pages/EmployeeList';
import AssignmentList from './pages/AssignmentList';
import EmployeeProfile from './pages/EmployeeProfile';
import Login from './pages/Login';
import Register from './pages/Register';
import { authService } from './services/authService';

function App() {
  const [user, setUser] = useState(authService.getCurrentUser());

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <Router>
      <div className="min-h-screen bg-black">
        {user && <Navbar />}
        <main className={user ? 'py-4' : ''}>
          <Routes>
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" replace />} />
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/" replace />} />
            
            <Route path="/" element={
              <ProtectedRoute>
                <EmployeeList />
              </ProtectedRoute>
            } />
            <Route path="/assignments" element={
              <ProtectedRoute>
                <AssignmentList />
              </ProtectedRoute>
            } />
            <Route path="/employees/:id" element={
              <ProtectedRoute>
                <EmployeeProfile />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
