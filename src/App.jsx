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
import RootLayout from "./Components/HomeComponents/RootLayout/RootLayout.jsx";

import Home from "./Pages/Home/Home.jsx";
import Error from "./Components/Error/Error.jsx";
const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/registration" element={<Registraion />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route element={<RootLayout />}>
          <Route index path="/" element={<Home />}></Route>
          <Route path="/chat" element={"Caht"}></Route>
          <Route path="/notification" element={"Notification"}></Route>
          <Route path="/settings" element={"settings"}></Route>
          <Route path="*" element={<Error />}></Route>
        </Route>
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
