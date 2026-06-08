import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './features/landing/pages/Home'
import RegisterPage from './features/auth/pages/RegisterPage'
import { LoginPage } from './features/auth/pages/LoginPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/connexion" element={<LoginPage />} />
      <Route path="/inscription" element={<RegisterPage />} />

      {/* <Route element={<PrivateRoute />}>
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
      </Route> */}
    </Routes>
    
  )
}

export default App
