import React, { use } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [user, setUser] = useState({
    username: "",
    password: "",
    role: "",
  });
  
  const navigate = useNavigate();
  const banker = localStorage.getItem("rolechosse");
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(`${ import.meta.env.VITE_API_BASE_URL}/signup`, user);
      alert(res.data.message);
      if (user.role === "customer") {
        navigate("/CustomerLogin");
      } else if (user.role === "banker") {
        navigate("/BankerLogin");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Signup failed. Please try again.");
    }
  };
  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className="container cont  shadow-lg">
          <div className="row">
            <Link className="text-decoration-none" to={'/'}>Home</Link>
            <h2 className="text-center fw-bold">Sign Up</h2>
            <div className="col-sm-12 col-lg-12">
              <label htmlFor="username" className="form-label px-2 mt-1">
                Username
              </label>
              <input
                type="text"
                className="form-control px-2 text-center"
                required
                placeholder="Enter here"
                name="username"
                value={user.username}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-lg-12">
              <label htmlFor="password" className="form-label px-2 mt-1">
                Password
              </label>
              <input
                type="password"
                className="form-control px-2 text-center"
                required
                placeholder="Enter here"
                name="password"
                value={user.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <select
                name="role"
                id="my-dropdown"
                value={user.role}
                onChange={handleChange}
                className="form-select px-2 mt-3 text-center"
              >
                <option value="">Choose Role</option>
                <option value="customer">Customer</option>
                <option value="banker">Banker</option>
              </select>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-sm-12 d-flex justify-content-center align-items-center flex-wrap">
              <button className="btn btn-primary text-center ntb" type="submit">
                Sign Up
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12  d-flex justify-content-center flex-wrap">
              <p className="mt-3">
                Already have an account?{" "}
                <Link
                  to={banker === "banker" ? "/BankerLogin" : "/CustomerLogin"}
                  className="text-decoration-none "
                >
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Signup;
