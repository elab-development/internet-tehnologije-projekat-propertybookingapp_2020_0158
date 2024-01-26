import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import WelcomePage from './components/Welcome/WelcomePage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route 
          path="/" 
          element={<WelcomePage/>} 
          />
          
        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
