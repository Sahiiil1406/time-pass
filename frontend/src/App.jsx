import React, { useState } from "react";
import InputField from "./components/inputFields/InputField";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/layouts/NavBar";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp/SignUp";
import LoadingBar from "react-top-loading-bar";
import ProtectedRoute from "./components/ProtectedRoute";
import Temp from "./pages/temp/temp";
import EditProfile from "./pages/Profile/EditProfile";
import Profile from "./pages/Profile/Profile";
import Feed from "./pages/feed/Feed";
import "./App.css";
import Intrest from "./pages/auth/Intrest/Intrest";
import Education from "./pages/auth/Education/Education";
import Mainpage from "./pages/Chat/Mainpage";
const App = () => {
	const [progress, setProgress] = useState(0);
	const [isModalOpen, setIsModalOpen] = useState(false);
	return (
    <>
      <LoadingBar
        color="#8378FF"
        height={3}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="w-full h-[100vh] flex items-center justify-center {isModalOpen ? 'blur-sm' : ''}">
        <Routes>
          <Route path="/update" element={<EditProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/temp" element={<Temp />} />
          <Route path="/signup/*" element={<SignUp />} />
          <Route path="/intrest" element={<Intrest />} />
          <Route path="/education" element={<Education />} />
          <Route path="/chat" element={<Mainpage />} />
          <Route
            path="/"
            element={
              <NavBar>
                <ProtectedRoute />
              </NavBar>
            }
          >
            <Route path="/feed" element={<Feed />} />
            <Route path="/:username" element={<Profile />} />
          </Route>
        </Routes>
      </div>
    </>
  );
};
export default App;
