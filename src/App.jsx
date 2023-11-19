import React, { Suspense, useEffect } from "react";

import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import Loader from "./components/loader/Loader";
import TrashNote from "./components/trash/DeleteNote";
import { ScaleLoader } from "react-spinners";
import Home from "./components/home/Home";
import FavoriteNote from "./components/Favorite/FavoriteNote";
import ArcheiveNotes from "./components/Archive/ArcheiveNotes";
import Login from "./components/userAuth/login/Login";
import ResetPassword from "./components/userAuth/resetPassword/ResetPassword";
import ForgotPassword from "./components/userAuth/forgotPassword/ForgotPassword";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setloading] = useState(true);

  function toggleMode() {
    setDarkMode(!darkMode);
  }

  useEffect(() => {
    setTimeout(() => {
      setloading(false);
    }, 1100);
  }, []);

  return (
    <>
      <div className={`${darkMode ? "dark" : ""} `}>
        <div className=" font-sans bg-custom-white dark:bg-black relative transition duration-300 ease-in-out ">
          {loading === true ? (
            <Loader />
          ) : (
            <>
              <Navbar toggleMode={toggleMode} darkMode={darkMode}/>

              <ToastContainer />

              <Suspense
                fallback={
                  <div className=" flex justify-center items-center h-screen">
                    <ScaleLoader color="red" />
                  </div>
                }
              >
                <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route
                    path="/reset-password/:id/:token"
                    element={<ResetPassword />}
                  />
                  <Route path="/favoriteNote" element={<FavoriteNote />} />
                  <Route path="/ArchiveNote" element={<ArcheiveNotes />} />
                  <Route path="/TrashNote" element={<TrashNote />} />
                </Routes>
              </Suspense>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;

