import React from "react";
import Registraion from "./Pages/Registration/Registraion.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Registraion />
    </div>
  )
  
};

export default App;
