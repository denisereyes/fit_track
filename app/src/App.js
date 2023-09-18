import React, { useEffect } from "react";
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/home/Home";
import Questionnaire from "./views/sign_up/Questionnaire"
import Login from "./views/login/login";
import Settings from "./views/settings/Settings";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Login />} />
          <Route path="/new" element={<Questionnaire />} />
          <Route path="/home" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
