import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './features/landing/pages/Home'
import RegisterPage from './features/auth/pages/RegisterPage'
import { LoginPage } from './features/auth/pages/LoginPage'
import { DashboardLayout } from './features/dashboard/layout/DashboardLayout'
import { OverviewPage } from './features/dashboard/pages/OverviewPage'
import { PrivateRoute } from './routes/Protected.routes'
import { ParcelPage } from './features/dashboard/pages/ParcelPage'
import { ShipmentsPage } from './features/dashboard/pages/ShipmentsPage'
import { ConsigneesPage } from './features/dashboard/pages/ConsigneesPage'
import { ClaimsPage } from './features/dashboard/pages/ClaimsPage'
import { SettingPage } from './features/dashboard/pages/SettingPage'
import { RapportsPage } from './features/dashboard/pages/RapportsPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/connexion" element={<LoginPage />} />
      <Route path="/inscription" element={<RegisterPage />} />

      <Route element={<PrivateRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard">
            <Route index element={<OverviewPage />} /> 
            <Route path="colis" element={<ParcelPage />} /> 
             <Route path="expeditions" element={<ShipmentsPage />} /> 
             <Route path="destinataires" element={<ConsigneesPage />} /> 
             <Route path="reclamations" element={<ClaimsPage />} /> 
             <Route path="rapports" element={<RapportsPage />} /> 
             <Route path="settings" element={<SettingPage />} /> 
          </Route>
        </Route>
      </Route>
      
    </Routes>
    
  )
}

export default App
