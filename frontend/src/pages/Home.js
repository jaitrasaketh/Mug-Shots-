import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../layout/header';
import Footer from '../layout/footer';
import './Home.css';

const Home = () => {
  const [recentTransactions, setRecentTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const transactions = JSON.parse(localStorage.getItem('recentTransactions')) || [];
    setRecentTransactions(transactions);
  }, []);

  const handleViewBill = (invoiceId) => {
    navigate(`/invoice/${invoiceId}`);
  };

  return (
    <div className="home-container">
      <Header />
      <div className="main-content">
        <div className="main-menu">
          <h2>ITEMS</h2>
          <ul>
            <li><Link to="/add">Add Item</Link></li>
            <li><Link to="/delete">Menu</Link></li>
          </ul>
        </div>

        <div className="table-section">
          <div className="heading">Recent Transactions</div>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Account No.</th>
                <th>View Bill</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.length > 0 ? recentTransactions.slice(0, 5).map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction.date}</td>
                  <td>{transaction.accountName}</td>
                  <td>
                    <button onClick={() => handleViewBill(transaction.invoiceId)}>View Bill</button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="3" style={{ textAlign: 'center' }}>No recent transactions</td>
                </tr>
              )}
              {Array.from({ length: 5 - recentTransactions.length }).map((_, index) => (
                <tr key={index + recentTransactions.length}>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
          <li><Link to="/newbill" className="new-bill-button">New Bill</Link></li>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
