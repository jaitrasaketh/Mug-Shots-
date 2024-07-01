// src/pages/Newbill.js
import React, { useState } from 'react';
import Header from '../layout/header';
import Footer from '../layout/footer';
import './Newbill.css';

const Newbill = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState([]);
  const [quantity, setQuantity] = useState({});
  const [searchedItems, setSearchedItems] = useState([]);

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    // Implement search functionality here if needed
    // For simplicity, assuming items are hardcoded or fetched elsewhere
    // Example of hardcoded items to simulate search:
    const dummyItems = [
      { name: 'Item 1', price: 10 },
      { name: 'Item 2', price: 15 },
      { name: 'Item 3', price: 20 },
    ];
    const filteredItems = dummyItems.filter(item =>
      item.name.toLowerCase().includes(term.toLowerCase())
    );
    setSearchedItems(filteredItems);
  };

  const handleAddItem = (item) => {
    // Check if item is already in items array
    if (!items.find(existingItem => existingItem.name === item.name)) {
      setItems([...items, item]);
      setQuantity({ ...quantity, [item.name]: 1 }); // Initialize quantity with 1
    } else {
      // Item already exists, increase its quantity
      setQuantity({ ...quantity, [item.name]: quantity[item.name] + 1 });
    }
    setSearchTerm(''); // Clear search term after adding item
    setSearchedItems([]); // Clear searched items list
  };

  const increaseQuantity = (itemName) => {
    setQuantity({ ...quantity, [itemName]: quantity[itemName] + 1 });
  };

  const decreaseQuantity = (itemName) => {
    if (quantity[itemName] > 0) {
      setQuantity({ ...quantity, [itemName]: quantity[itemName] - 1 });
    }
  };

  const deleteItem = (itemName) => {
    const updatedItems = items.filter((item) => item.name !== itemName);
    setItems(updatedItems);
    const { [itemName]: removedItem, ...updatedQuantity } = quantity;
    setQuantity(updatedQuantity);
  };

  const createBill = () => {
    // Logic to create bill
    console.log("Creating bill...");
    // Open a new window of size 300x300px
    window.open('', 'NewWindow', 'width=500,height=500');
  };

  return (
    <div className="newbill-container">
      <Header />
      <div className="newbill-content">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className="search-button">Search</button>
        </div>
        <div className="items-list">
          <ul className="searched-items">
            {searchedItems.map((item) => (
              <li key={item.name}>
                {item.name} - ${item.price}
                <button className="add-button" onClick={() => handleAddItem(item)}>Add</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="bill-table">
          <table>
            <thead>
              <tr>
                <th style={{ color: '#FFFFFF' }}>Item Name</th>
                <th style={{ color: '#FFFFFF' }}>Quantity</th>
                <th style={{ color: '#FFFFFF' }}>Price</th>
                <th style={{ color: '#FFFFFF' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.name}>
                  <td>{item.name}</td>
                  <td>
                    <button onClick={() => decreaseQuantity(item.name)}>-</button>
                    {quantity[item.name]}
                    <button onClick={() => increaseQuantity(item.name)}>+</button>
                  </td>
                  <td>${item.price}</td>
                  <td>
                    <button onClick={() => deleteItem(item.name)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="create-bill-button" onClick={createBill}>Create Bill</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Newbill;
