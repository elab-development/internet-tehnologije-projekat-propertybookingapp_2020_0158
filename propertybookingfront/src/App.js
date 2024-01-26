import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import WelcomePage from './components/Welcome/WelcomePage';
import Agents from './components/Agents/Agents';

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
          
        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
