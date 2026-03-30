import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute, AdminRoute } from './components/auth/ProtectedRoute'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Calculators from './pages/Calculators'
import Pricing from './pages/Pricing'
import Dashboard from './pages/Dashboard'

// Admin
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminUsers from './pages/admin/AdminUsers'
import AdminCalculators from './pages/admin/AdminCalculators'

// Calculator detail page
import CalculatorPage from './pages/calculators/CalculatorPage'

function Layout({ children, noFooter = false }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-950">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      {!noFooter && <Footer />}
    </div>
  )
}

function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-950">
      {children}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public marketing pages */}
          <Route path="/" element={
            <Layout>
              <Home />
            </Layout>
          } />
          <Route path="/precios" element={
            <Layout>
              <Pricing />
            </Layout>
          } />

          {/* Auth pages */}
          <Route path="/login" element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          } />
          <Route path="/registro" element={
            <AuthLayout>
              <Register />
            </AuthLayout>
          } />

          {/* Calculators - public */}
          <Route path="/calculadoras" element={
            <Layout>
              <Calculators />
            </Layout>
          } />
          <Route path="/calculadoras/:slug" element={
            <Layout>
              <CalculatorPage />
            </Layout>
          } />

          {/* Protected user pages */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          } />

          {/* Admin pages */}
          <Route path="/admin" element={
            <AdminRoute>
              <Layout noFooter>
                <AdminDashboard />
              </Layout>
            </AdminRoute>
          } />
          <Route path="/admin/usuarios" element={
            <AdminRoute>
              <Layout noFooter>
                <AdminUsers />
              </Layout>
            </AdminRoute>
          } />
          <Route path="/admin/calculadoras" element={
            <AdminRoute>
              <Layout noFooter>
                <AdminCalculators />
              </Layout>
            </AdminRoute>
          } />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
