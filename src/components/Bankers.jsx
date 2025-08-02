import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Bankers.css';

function Bankers() {
  const [users, setUsers] = useState([]);
  const [tran, setTran] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get(`${ import.meta.env.VITE_API_BASE_URL}/fetch`);
        setUsers(res.data);
      } catch (err) {
        alert(err.message);
      }
    };
    fetchdata();
  }, []);

  const handleClick = async (id) => {
    try {
      const res = await axios.get(`${ import.meta.env.VITE_API_BASE_URL}/transactions/${id}`);
      setTran(res.data);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <h2 className='fw-bold mt-3 mb-3 text-center'>Accounts Details</h2>
      <ul className="list-group">
        {users.map((usr) => (
          <li
            key={usr.id}
            className="list-group-item"
            onClick={() => handleClick(usr.id)}  
            style={{ cursor: "pointer" }}        
          >
            <strong>Id: {usr.id}</strong> | <strong>Username: {usr.username}</strong>
          </li>
        ))}
      </ul>

      {tran.length > 0 && <h4 className="mt-4 text-center">Transaction History</h4>}
      <ul className="list-group">
        {tran.map((txn) => (
          <li className="list-group-item" key={txn.id}>
            <strong>{txn.type.toUpperCase()}</strong> - ₹{txn.amount} → Balance: ₹{txn.balance}
          </li>
        ))}
      </ul>
      <Link to={"/"} className='text-decoration-none'><button className="btn btn-primary mt-3 mb-3">Home</button></Link>
    </>
  );
}

export default Bankers;
