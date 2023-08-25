import React from "react";
import LoginPage from "./pages/loaginPage/loginPage";
import UserDatailsPage from "./pages/userDatailsPage/userDatailsPage";
import AssetPage from "./pages/assetPage/assetPage";
import { Routes, Route } from "react-router-dom";
import "./App.css";

// mongodb+srv://akhtarnasim1990:<password>@cluster0.cwftjul.mongodb.net/
// S1BjGLRY6wQqcqs3

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<UserDatailsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/assets" element={<AssetPage />} />
      </Routes>
    </div>
  );
}

export default App;
