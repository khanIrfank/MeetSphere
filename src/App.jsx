import { Routes, Route } from 'react-router-dom'
import PubLayout from './layouts/PubLayout/PubLayout'
import AuthLayout from './layouts/AuthLayout/AuthLayout'
import UserLayout from './layouts/UserLayout/UserLayout'
import ProtectedRoute from './routes/ProtectedRoute'

import Home from './pages/pub/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgotPassword from './pages/auth/ForgotPassword'

import DashboardHome from './pages/dashboard/DashboardHome'
import MeetingsList from './pages/dashboard/MeetingsList'
import MeetingRoom from './pages/dashboard/MeetingRoom'
import PlanBilling from './pages/dashboard/PlanBilling'
import Settings from './pages/dashboard/Settings'

import NotFound from './components/errors/NotFound'
import Unauthorized from './components/errors/Unauthorized'
import { MeetingsProvider } from './context/MeetingsContext'
import { PlanProvider } from './context/PlanContext'
import CheckoutModal from './components/modals/CheckoutModal'

export default function App() {
  return (
    <PlanProvider>
      <MeetingsProvider>
        <CheckoutModal />
        <Routes>
          {/* Public site */}
          <Route element={<PubLayout />}>
            <Route path="/" element={<Home />} />
          </Route>

          {/* Auth */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>

          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Protected dashboard / user side */}
          <Route element={<ProtectedRoute />}>
            <Route element={<UserLayout />}>
              <Route path="/app" element={<DashboardHome />} />
              <Route path="/app/meetings" element={<MeetingsList />} />
              <Route path="/app/plans" element={<PlanBilling />} />
              <Route path="/app/settings" element={<Settings />} />
            </Route>
            <Route path="/app/room/:id" element={<MeetingRoom />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </MeetingsProvider>
    </PlanProvider>
  )
}
