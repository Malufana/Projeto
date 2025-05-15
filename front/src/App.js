import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './Paginas/Login';
import { Home } from './Paginas/Home';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/Login' element={<Login />}/>
        <Route path='/Home' element={<Home />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
