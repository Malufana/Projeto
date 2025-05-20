import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './Paginas/Login';
import { Home } from './Paginas/Home';
import { Upload } from './Paginas/Upload'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/Home' element={<Home />}/>
        <Route path='/Upload' element={<Upload />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
