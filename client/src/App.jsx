import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import React from 'react'
import CreateGroupButton from './components/CreateGroupButton'
import GroupForm from './components/GroupForm'

import { useState } from 'react'
import LoginPage from './pages/LoginPage';
import MainLayout from './layouts/MainLayout';
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/HomePage';
import axios from 'axios';


axios.defaults.baseURL = 'http://localhost:5000';




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
    {/* <Route index element={<LoginPage />} /> */}
    {/* <Route path='/creategroup' element={<HomePage />}/> */}
    <Route index element={<HomePage />}/>
    <Route path='*' element={<NotFoundPage />}/>
    </Route>
  )
);

const App = () => {

  
    
  // return(

      return <RouterProvider router={router} />
      

  // )
}

export default App