import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './features/landing/pages/Home'
import RegisterPage from './features/auth/pages/RegisterPage'
import { LoginPage } from './features/auth/pages/LoginPage'
import { DashboardLayout } from './features/dashboard/layout/DashboardLayout'
import { OverviewPage } from './features/dashboard/pages/OverviewPage'
import { PrivateRoute } from './routes/Protected.routes'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/connexion" element={<LoginPage />} />
      <Route path="/inscription" element={<RegisterPage />} />

      <Route element={<PrivateRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<OverviewPage /> } /> 
        </Route>
      </Route>
    </Routes>
    
  )
}

export default App
