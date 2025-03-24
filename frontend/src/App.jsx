import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Home from './pages/Home/';
import MyCards from './pages/MyCards/';
import ProtectedRoute from './components/ProtectedRoute/';
import MainLayout from './components/MainLayout/';
import AddSnippetPage from './components/AddSnippetModal';

function App() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route
            element={
              <MainLayout
                searchValue={searchValue}
                onSearchChange={(e) => setSearchValue(e.target.value)}
              />
            }
          >
            <Route path="/home" element={<Home searchValue={searchValue} />} />
            <Route path="/add-code" element={<AddSnippetPage />} />
            <Route path="/my-cards" element={<MyCards />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
