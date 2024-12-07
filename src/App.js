// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import AdminDashboard from './pages/AdminDashboard';

const App = () => {
    const [isAuthenticated, setAuthenticated] = useState(false);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login setAuthenticated={setAuthenticated} />} />
                <Route
                    path="/admin"
                    element={isAuthenticated ? <AdminDashboard /> : <Login setAuthenticated={setAuthenticated} />}
                />
            </Routes>
        </Router>
    );
};

export default App;
