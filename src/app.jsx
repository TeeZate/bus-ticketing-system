import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './context/AuthContext';

// Layout components
import Header from './components/common/Header';
import Footer from './components/common/Footer';

// Public pages
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import BusDetailsPage from './pages/BusDetailsPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import TermsPage from './pages/TermsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import NotFoundPage from './pages/NotFoundPage';

// User pages
import PaymentPage from './pages/user/PaymentPage';
import BookingConfirmationPage from './pages/user/BookingConfirmationPage';
import MyBookingsPage from './pages/user/MyBookingsPage';
import BookingDetailsPage from './pages/user/BookingDetailsPage';
import ProfilePage from './pages/user/ProfilePage';
import PaymentMethodsPage from './pages/user/PaymentMethodsPage';
import NotificationsPage from './pages/user/NotificationsPage';

// Admin pages
// import AdminDashboardPage from './pages/admin/AdminDashboardPage';
// import AdminBusesPage from './pages/admin/AdminBusesPage';
// import AdminRoutesPage from './pages/admin/AdminRoutesPage';
// import AdminBookingsPage from './pages/admin/AdminBookingsPage';
// import AdminUsersPage from './pages/admin/AdminUsersPage';

// Protected route component
// import ProtectedRoute from './pages/auth/ProtectedRoute';

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Header />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="/bus/:id" element={<BusDetailsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/payment/:bookingId" element={<PaymentPage />} />
            <Route path="/booking-confirmation/:bookingId" element={<BookingConfirmationPage />} />
            <Route path="/my-bookings" element={<MyBookingsPage />} />
            <Route path="/booking-details/:bookingId" element={<BookingDetailsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/payment-methods" element={<PaymentMethodsPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />

            
            {/* User routes */}
            {/* <Route path="/payment/:bookingId" element={
              <ProtectedRoute>
                <PaymentPage />
              </ProtectedRoute>
            } />
            <Route path="/booking-confirmation/:bookingId" element={
              <ProtectedRoute>
                <BookingConfirmationPage />
              </ProtectedRoute>
            } />
            <Route path="/my-bookings" element={
              <ProtectedRoute>
                <MyBookingsPage />
              </ProtectedRoute>
            } />
            <Route path="/booking-details/:bookingId" element={
              <ProtectedRoute>
                <BookingDetailsPage />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
            <Route path="/payment-methods" element={
              <ProtectedRoute>
                <PaymentMethodsPage />
              </ProtectedRoute>
            } />
            <Route path="/notifications" element={
              <ProtectedRoute>
                <NotificationsPage />
              </ProtectedRoute>
            } /> */}
            
            {/* Admin routes */}
            {/* <Route path="/admin" element={
              <ProtectedRoute adminOnly={true}>
                <AdminDashboardPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/buses" element={
              <ProtectedRoute adminOnly={true}>
                <AdminBusesPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/routes" element={
              <ProtectedRoute adminOnly={true}>
                <AdminRoutesPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/bookings" element={
              <ProtectedRoute adminOnly={true}>
                <AdminBookingsPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/users" element={
              <ProtectedRoute adminOnly={true}>
                <AdminUsersPage />
              </ProtectedRoute>
            } /> */}
            
            {/* 404 route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
