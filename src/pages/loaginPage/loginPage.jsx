import React, { useState } from "react";
import "./loginPage.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = () => {
    console.log(name, password);
    try {
      if (name === "") {
        return toast.warning("Please enter your name.");
      } else if (password === "") {
        return toast.warning("Please enter your password");
      }
      axios
        .post("http://localhost:8000/users/login", { name, password })
        .then((response) => {
          if (response.data.success) {
            localStorage.setItem("user_auth_token", response.data.data);
            toast.success(response.data.message);
            navigate("/assets");
          }
          console.log(response);
        })
        .catch((error) => {
          if (!error.response.data.success) {
            toast.error(error.response.data.message);
          }
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="company-name">Nasim webtechi</div>
        <div className="login-body">
          <div className="login-page-title">Welcome Back</div>
          <div className="title-note">Welcome back! please enter your details.</div>
          <div className="label-input-div">
            <div className="input-label">Name</div>
            <input type="text" placeholder="Enter your name..." value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="label-input-div">
            <div className="input-label">Password</div>
            <input type="password" placeholder="Enter your password..." value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button className="sign-in-button" onClick={loginHandler}>
            Sign in
          </button>
        </div>
      </div>
      <div className="login-right">
        <div className="circle-container">
          <div className="circle"></div>
          <div className="circle-glass-morphism"></div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
