import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Courts from './pages/Courts';
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './layouts/Layout';

import DashboardRoutes from './routes/DashboardRoutes';
import MemberRoutes from './routes/MemberRoutes';
import AdminRoutes from './routes/AdminRoutes';

import NotFound from './pages/NotFound';
import PrivateRoute from './components/PrivateRoute';
import About from './components/About';
import Promotions from './components/Promotions';
import FAQSection from './components/Faq';
import Contact from './pages/Contact';

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/courts" element={<Courts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About></About>} />
        <Route path="/promotions" element={<Promotions></Promotions>} />
        <Route path="/faq" element={<FAQSection></FAQSection>} />
        <Route path="/contact" element={<Contact></Contact>} />

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
            <PrivateRoute roleRequired="member">
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


