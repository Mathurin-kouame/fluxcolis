import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './features/landing/pages/Home'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/login" element={<Login />} /> */}

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
