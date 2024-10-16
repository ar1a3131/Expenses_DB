import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Request from './pages/Request';
import Database from './pages/Database';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Expenses Database</h1>
        {/*insert image here */}
        <div>
          <Link to="/">
            <button>Home</button>
          </Link>
          <Link to="/submit-request">
            <button>Submit Request</button>
          </Link>
          <Link to="/database">
            <button>Database</button>
          </Link>
        </div>


        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/submit-request" element={<Request />} />
          <Route path="/database" element={<Database />} />
        </Routes>


      </div>
    </Router>
  );
};


export default App;




