import React, { useEffect, useState } from "react";
import axios from "axios";

function Transactions({ userId, token, refresh }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (userId && token) {
      axios
        .get(`${ import.meta.env.VITE_API_BASE_URL}/transactions/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => setTransactions(res.data))
        .catch((err) => console.error("Error fetching transactions", err));
    }
  }, [userId, token,refresh]);

  return (
    <div>
      <h3 className="mb-3 mt-5 fw-bold">Transaction History</h3>
      <ul className="list-group">
        {transactions.map((txn) => (
          <li key={txn.id} className="list-group-item">
            <strong>{txn.type.toUpperCase()}</strong> - ₹{txn.amount} → Balance: ₹{txn.balance}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Transactions;
