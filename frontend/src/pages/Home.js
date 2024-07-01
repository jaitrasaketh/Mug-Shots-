// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../layout/header';
import Footer from '../layout/footer';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <Header />
      <div className="main-content">
        <div className="main-menu">
          <h2>ITEMS</h2>
          <ul>
          <li><Link to="/add">Add Item</Link></li>
          <li>Delete Items</li>
          <li><Link to="/alter">Alter Item</Link></li>
            
          </ul>
        </div>
        
        <div className="table-section">
        <div className='heading'> Recent Transactions</div>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Transaction from Account name</th>
                <th>View Bill</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>01/01/2024</td>
                <td>Account 1</td>
                <td>Bill 1</td>
              </tr>
              <tr>
                <td>02/01/2024</td>
                <td>Account 2</td>
                <td>Bill 2</td>
              </tr>
              <tr>
                <td>03/01/2024</td>
                <td>Account 3</td>
                <td>Bill 3</td>
              </tr>
              <tr>
                <td>04/01/2024</td>
                <td>Account 4</td>
                <td>Bill 4</td>
              </tr>
              <tr>
                <td>05/01/2024</td>
                <td>Account 5</td>
                <td>Bill 5</td>
              </tr>
            </tbody>
          </table>
          <li><Link to="/newbill" className="new-bill-button">New Bill</Link></li> {/* Link to Newbill page */}
          </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
