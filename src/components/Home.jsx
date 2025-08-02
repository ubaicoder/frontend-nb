import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./Home.css";


function Home() {
  const [user, setUser] = useState();
  const handleclick = (event) => {
    const { name } = event.target;
    setUser(name);
  }
  localStorage.setItem("rolechosse", user);
  return (
    <>
      <div className="container con mt-5 d-flex justify-content-center align-items-center">
        <div className="row">
          <div className="col-lg-12 col-sm-12">
            <h1 className="fw-bold text-center mt-3">Welcome to Bankers</h1>
            <p className="text-center mt-3">
              Bankers is a web application that allows users to manage their
              banking transactions, view account details, and perform various
              banking operations.
            </p>
            <div className="mt-2 buton d-flex flex-wrap justify-content-center align-items-center gap-3">
              <Link to="/CustomerSignup">
                <button className="btn btn-primary ms-2 tbn" name="customer" onClick={handleclick}>Customer</button>
              </Link>
              <Link to="/BankerSignup">
                <button className="btn btn-secondary ms-2 tbn" name="banker" onClick={handleclick}>Banker</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
