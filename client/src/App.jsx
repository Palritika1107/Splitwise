import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import React from "react";
import CreateGroupButton from "./components/CreateGroupButton";

import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./layouts/MainLayout";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";
import axios from "axios";
import FormPage from "./pages/FormPage";
import FriendListPopUp from "./components/FriendListPopUp";
import Login from "./components/Login";
import GroupHomePage from "./components/GroupHomePage";

axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Login />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path='/creategroup' element={<HomePage />}/> */}

      <Route path="/homepage" element={<HomePage />} />
      <Route path="/groupform" element={<FormPage />} />
      <Route path="/addfriend" element={<FriendListPopUp />} />
      <Route path="/group/:id" element={<GroupHomePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

const App = () => {
  // return(

  return <RouterProvider router={router} />;

  // )
};

export default App;
