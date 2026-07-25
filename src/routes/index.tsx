import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ProtectedRoute, GuestRoute, RoleRoute } from './RouteGuards';

// Page components (using direct imports for synchronous local bundle verification)
import { Home } from '../pages/Home/Home';
import { Restaurants } from '../pages/Restaurants/Restaurants';
import { RestaurantDetails } from '../pages/RestaurantDetails/RestaurantDetails';
import { Search } from '../pages/Search/Search';
import { Offers } from '../pages/Offers/Offers';
import { Checkout } from '../pages/Checkout/Checkout';
import { Orders } from '../pages/Orders/Orders';
import { Profile } from '../pages/Profile/Profile';
import { About } from '../pages/About/About';
import { NotFound } from '../pages/NotFound/NotFound';
import { DeveloperPortal } from '../pages/Developer/index';

// Dashboards operations panels
import { RestaurantDashboard } from '../dashboards/Restaurant/index';
import { DeliveryDashboard } from '../dashboards/Delivery/index';
import { AdminDashboard } from '../dashboards/Admin/index';

// Layout wrappers
import { MainLayout } from '../layouts/MainLayout';
import { DashboardLayout } from '../layouts/DashboardLayout';

// Unified dashboard router resolving internal role viewports
const DashboardRouter: React.FC = () => {
  const { role } = useAuth();

  if (role === 'customer') {
    // Customers can view profile order history as their dashboard
    return (
      <MainLayout>
        <Profile />
      </MainLayout>
    );
  }

  if (role === 'restaurant') {
    return (
      <DashboardLayout>
        <RestaurantDashboard />
      </DashboardLayout>
    );
  }

  if (role === 'delivery') {
    return (
      <DashboardLayout>
        <DeliveryDashboard />
      </DashboardLayout>
    );
  }

  if (role === 'admin') {
    return (
      <DashboardLayout>
        <AdminDashboard />
      </DashboardLayout>
    );
  }

  return <Navigate to="/" replace />;
};

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Customer / Guest facing layout */}
      <Route path="/" element={<MainLayout><Home /></MainLayout>} />
      <Route path="/restaurants" element={<MainLayout><Restaurants /></MainLayout>} />
      <Route path="/restaurants/:id" element={<MainLayout><RestaurantDetails /></MainLayout>} />
      <Route path="/search" element={<MainLayout><Search /></MainLayout>} />
      <Route path="/offers" element={<MainLayout><Offers /></MainLayout>} />
      <Route path="/about" element={<MainLayout><About /></MainLayout>} />

      {/* Protected Customer Routes */}
      <Route path="/checkout" element={<ProtectedRoute><MainLayout><Checkout /></MainLayout></ProtectedRoute>} />
      <Route path="/orders" element={<ProtectedRoute><MainLayout><Orders /></MainLayout></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><MainLayout><Profile /></MainLayout></ProtectedRoute>} />

      {/* Unified Dashboard router */}
      <Route path="/dashboard" element={<ProtectedRoute><DashboardRouter /></ProtectedRoute>} />

      {/* Standalone Developer Portal */}
      <Route path="/developer" element={<DeveloperPortal />} />
      <Route path="/developer/login" element={<DeveloperPortal />} />

      {/* 404 Fallback */}
      <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
    </Routes>
  );
};
