import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Transactions from "./Transactions";
import "./CustomerDashboard.css";

function CustomerDashboard() {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const res = await axios.get(`${ import.meta.env.VITE_API_BASE_URL}/protected`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(res.data);
      } catch (err) {
        alert(res.data.message);
        navigate("/CustomerLogin");
      }
    };
    fetchProtectedData();
  }, []);
  const handleTransaction = async (type) => {
    try {
      const res = await axios.post(`${ import.meta.env.VITE_API_BASE_URL}/${type}`, {
        userId: userData.id,
        amount,
      });
      setMessage(res.data);
      setAmount("");
      setRefresh((prev) => !prev);
    } catch (err) {
      alert("transaction failed");
    }
  };
  return (
    <>
      <div className="container mt-5 cont1">
        <h2 className="text-center fw-bold">
          Welcome, {userData ? userData.username : "Loading..."}
        </h2>
        <div className="row">
          <div className="col-auto">
            <label htmlFor="amount" className="form-label px-2 mt-1">
              Amount
            </label>
            <input
              type="number"
              className="form-control px-2 text-center"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter Amount"
            />
          </div>
        </div>
        <div className="row mt-3 tran">
          <div className="col-auto">
            <button
              className="btn btn-success me-2"
              onClick={() => handleTransaction("deposit")}
            >
              Deposit
            </button>
            <button
              className="btn btn-danger"
              onClick={() => handleTransaction("withdraw")}
            >
              Withdraw
            </button>
            <Link to={"/"}>
              <button className="btn btn-primary mx-2">Home</button>
            </Link>
          </div>
        </div>
        {message && <div className="alert alert-info mt-3">{message}</div>}

        {/* Transaction history */}
        {userData && <Transactions userId={userData.id} token={token}  refresh={refresh} />}
      </div>
    </>
  );
}

export default CustomerDashboard;
