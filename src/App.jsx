import React from "react";
import Registraion from "./Pages/Registration/Registraion.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import Login from "./Pages/Login/Login.jsx";
const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/registration" element={<Registraion />}></Route>
        <Route path="/login" element={<Login/>}></Route>
      </>
    )
  );
  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
};

export default App;
