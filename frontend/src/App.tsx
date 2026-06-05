import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './features/landing/pages/Home'
import RegisterPage from './features/auth/pages/RegisterPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Register" element={<RegisterPage />} />

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
