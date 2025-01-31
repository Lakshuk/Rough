import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import { AuthProvider } from './AuthContext';
import { AuthProvider } from './context/AuthContext';
// import LoginSignup from './components/LoginSignUp';
import LoginSignup from './components/LoginSignup';
import Employee from './components/Employee';
import EmployeeDetails from './components/EmployeeDetails';
import EmployeeDelete from './components/EmployeeDelete';
import EmployeeList from './components/EmployeesList';
import Update from './components/Update';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<LoginSignup />} />

          {/* Protected Routes */}
          <Route
            path="/add-employee"
            element={
              <PrivateRoute>
                <Employee />
              </PrivateRoute>
            }
          />
          <Route
            path="/employee-list"
            element={
              <PrivateRoute>
                <EmployeeList />
              </PrivateRoute>
            }
          />
          <Route
            path="/employee/:id"
            element={
              <PrivateRoute>
                <EmployeeDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/update"
            element={
              <PrivateRoute>
                <Update />
              </PrivateRoute>
            }
          />
          <Route
            path="/employee-delete"
            element={
              <PrivateRoute>
                <EmployeeDelete />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
