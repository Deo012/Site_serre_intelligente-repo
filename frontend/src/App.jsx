/*
npm create vite@latest
npm i react-router-dom

*/

import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DashBoard from './pages/dashBoard';
import ConnexionPage from './pages/connexionPAge';
import DropImagePage from './pages/dropImagePage';


function App() {
  return(
    <>
    
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<DashBoard/>} />
        <Route path='/connexionPage' element={<ConnexionPage/>} />
        <Route path='/dropImagePage' element={<DropImagePage/>}/>
      </Routes>
    </BrowserRouter>

    </>
  );
}

export default App
