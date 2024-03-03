import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import WelcomePage from './components/Welcome/WelcomePage';
import Agents from './components/Agents/Agents';
import Properties from './components/Properties/Properties';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route 
          path="/" 
          element={<WelcomePage/>} 
        />
        <Route 
          path="/agents" 
          element={<Agents/>} 
        />
        <Route 
          path="/properties" 
          element={<Properties/>} 
        />
          
        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
