import React from 'react'
import { Home } from './pages/Home.tsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Jobdetail } from './pages/Jobdetail.tsx';
import Login from './pages/Login.tsx';
import Test from './pages/test.tsx';
import Register from './pages/Register.tsx';

import { useCookies } from 'react-cookie';


export const Main = () => {

  // const token = Cookies.get('token');
  const [cookies] = useCookies(['token']);

  return (
    <BrowserRouter>
    <Routes>
 
    
      <Route path="/" element={<Home />}></Route>
      <Route path="/jobdetail/:id" element={cookies.token?<Jobdetail />:<Login />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/test" element={<Test />}></Route>



    </Routes>
    </BrowserRouter>
  )
}
