// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Intro from './pages/Intro';
import Home from './pages/Home';
import Add from './pages/Add';
import Alter from './pages/Alter';
import Newbill from './pages/Newbill';
import Delete from './pages/Delete'; // Import Delete page

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/alter" element={<Alter />} />
        <Route path="/newbill" element={<Newbill />} />
        <Route path="/delete" element={<Delete />} /> {/* Add route for Delete page */}
      </Routes>
    </Router>
  );
};

export default App;
