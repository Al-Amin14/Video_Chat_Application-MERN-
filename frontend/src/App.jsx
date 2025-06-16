import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/login';
import Signup from './pages/Signup';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}> </Route>
        <Route path='/login' element={<Login />} ></Route>
        <Route path='/signup' element={<Signup/>} ></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
