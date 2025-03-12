/*
npm create vite@latest
npm i react-router-dom
npm install --save @iconscout/react-unicons
npm i framer-motion
*/

import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DashBoard from './pages/dashBoard';
import ConnexionPage from './pages/connexionPAge';
import DropImagePage from './pages/dropImagePage';
import AcceuilPage from './pages/acceuilPage';


function App() {
  return(
    <>
    
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<AcceuilPage/>} />
        <Route path='/dashBoard' element={<DashBoard/>} />
        <Route path='/connexionPage' element={<ConnexionPage/>} />
        <Route path='/dropImagePage' element={<DropImagePage/>}/>
      </Routes>
    </BrowserRouter>

    </>
  );
}

export default App
