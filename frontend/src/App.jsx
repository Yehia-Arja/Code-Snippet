import './App.css'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/signup'
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute'
function App() {
 

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/home" element={<ProtectedRoute> <Home /> <ProtectedRoute />} />
        </Routes>
      
      </BrowserRouter>
    </>
  )
}

export default App
