import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/login';
import Signup from './pages/Signup';
import { appContext } from './contexts/appContex';
import { SocketProvider } from './contexts/socketContext';
import { Bounce, ToastContainer } from 'react-toastify';

const App = () => {
  const [Loged, setLoged] = useState(false);
  return (

    <BrowserRouter>
      <appContext.Provider value={{ Loged ,setLoged }} >
        < SocketProvider>
          <Routes>
            <Route path='/' element={<Home />}> </Route>
            <Route path='/login' element={<Login />} ></Route>
            <Route path='/signup' element={<Signup />} ></Route>
          </Routes>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
        </SocketProvider>
      </appContext.Provider>
    </BrowserRouter>
  )
}

export default App
