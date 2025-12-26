import React, { useContext, useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import Home from './Components/Home/Home'
import Login from './Pages/Login/Login';
import { appcontext } from './admincontext/Admincontext';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// lets allow the .env file?



export default function App() {

  const { Token } = useContext(appcontext)
  if (Token) {
    return (
      <div className="App">
        <ToastContainer />
        <Home />
      </div>
    )
  } else {
    return (
      <>
        <ToastContainer />
        <Login />
      </>
    )
  }
}
