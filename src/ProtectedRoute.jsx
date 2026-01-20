// ProtectedRoute.js

import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import DashboardLayout from './Components/Common/DashboardLayout';

const ProtectedRoute = () => {
  const navigate = useNavigate();

  // Check if the user is authenticated (you can implement your own logic here)
  const isAuthenticated = true;
  if (!isAuthenticated) {
    // Redirect the user to the login page or another route
    navigate(-1);
    return null; // Render nothing if redirecting
  }

  return (
    <DashboardLayout>
      <Outlet /> {/* This will render nested routes */}
    </DashboardLayout>
  );
};

export default ProtectedRoute;
