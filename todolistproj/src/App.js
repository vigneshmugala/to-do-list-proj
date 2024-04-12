import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import HomePage from './components/HomePage';
import SignUpForm from './components/SignUpForm';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/signup"element={<SignUpForm/>} />
                <Route path="/" element={<LoginForm/>}/>
            </Routes>
        </Router>
    );
};

export default App;