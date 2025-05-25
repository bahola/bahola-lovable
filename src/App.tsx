
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import ProductPage from './pages/ProductPage';
import CategoryPage from './pages/CategoryPage';
import SearchResults from './pages/SearchResults';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductsManagement from './pages/admin/ProductsManagement';
import EditProduct from './pages/admin/EditProduct';
import Wishlist from './pages/Wishlist';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';
import Homeopathy from './pages/Homeopathy';
import ILoveHomeopathy from './pages/ILoveHomeopathy';
import AppointmentBooking from './pages/AppointmentBooking';
import AppointmentConfirmation from './pages/AppointmentConfirmation';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/homeopathy" element={<Homeopathy />} />
        <Route path="/i-love-homeopathy" element={<ILoveHomeopathy />} />
        <Route path="/bach-flower" element={<CategoryPage />} />
        <Route path="/bach-flower/:subcategory" element={<CategoryPage />} />
        <Route path="/concern/:concernId" element={<CategoryPage />} />
        
        {/* Appointment routes */}
        <Route path="/book-appointment" element={<AppointmentBooking />} />
        <Route path="/appointment-confirmation" element={<AppointmentConfirmation />} />
        
        {/* Admin routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<ProductsManagement />} />
        <Route path="/admin/products/edit/:productId" element={<EditProduct />} />
        <Route path="/admin/orders" element={<AdminDashboard />} />
        <Route path="/admin/customers" element={<AdminDashboard />} />
        <Route path="/admin/discounts" element={<AdminDashboard />} />
        <Route path="/admin/analytics" element={<AdminDashboard />} />
        <Route path="/admin/settings" element={<AdminDashboard />} />
        
        {/* Professional routes */}
        <Route path="/professional/materia-medica" element={<NotFound />} />
        <Route path="/professional/remedy-deep-dive" element={<NotFound />} />
        <Route path="/professional/case-studies" element={<NotFound />} />
        <Route path="/professional/signup" element={<Register />} />
        
        {/* Catch all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
