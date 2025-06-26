import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CustLogin.css";
function CustLogin() {
    const [user, setUser] = useState({
        username: "",
        password: "",
    });
    const navigate = useNavigate();
    const handleChange = (event)=>{
        const { name, value} = event.target;
        setUser((prev)=>({...prev,[name]:value}));

    };
    const handleFormSubmit = async(event)=>{
        event.preventDefault();
        try{
          const res = await axios.post(`${ import.meta.env.VITE_API_BASE_URL}/login`,user);
          const token = res.data.token;
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          alert(res.data.message);
          navigate("/custdashboard");
          console.log(res.data.user);
        } catch (err){
            console.error("Login error:", err);
            alert("Login failed. Please check your credentials.");
        }
    }
  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className="container cont">
          <div className="row">
            <h2 className="fw-bold text-center">Customer Login</h2>
            <div className="col-auto">
              <label htmlFor="username" className="form-label px-2 mt-1">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter here"
                required
                name="username"
                className="form-control px-2"
                value={user.username}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-auto">
              <label htmlFor="password" className="form-label px-2 mt-1">
                Password
              </label>
              <input
                type="password"
                className="form-control px-2"
                required
                placeholder="Enter here"
                name="password"
                value={user.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-auto">
              <button
                className="btn btn-primary text-center mt-3 ntb"
                type="submit"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default CustLogin;
