



import { Routes, Route } from 'react-router-dom';


import Home from './pages/Home';
import Courts from './pages/Courts';
import Login from './pages/Login';
import Register from './pages/Register';


import Layout from './layouts/Layout';

// Dashboard Routes
import DashboardRoutes from './routes/DashboardRoutes';
import MemberRoutes from './routes/MemberRoutes';
import AdminRoutes from './routes/AdminRoutes';

import NotFound from './pages/NotFound';
import PrivateRoute from './components/PrivateRoute';  // Make sure this works!

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/courts" element={<Courts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute>
              <DashboardRoutes />
            </PrivateRoute>
          }
        />
        <Route
          path="/member/*"
          element={
            <PrivateRoute>
              <MemberRoutes />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/*"
          element={
            <PrivateRoute>
              <AdminRoutes />
            </PrivateRoute>
          }
        />

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
