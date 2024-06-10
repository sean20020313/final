import React, { useState } from 'react';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/homepage'; 

const App = () => {
 

    return (
        <div>
            <Routes>
                <Route path={'/Signup'} element={<SignUp/>} />
                <Route path={'/'} element={<Login />} />
                <Route path={'/homepage'} element={<Homepage />} />:
            </Routes>
        </div>
    );
};

export default App;
