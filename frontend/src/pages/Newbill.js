import React, { useState, useEffect } from 'react';
import Header from '../layout/header';
import Footer from '../layout/footer';
import { db } from '../firebaseConfig';
import { collection, getDocs, query, where, addDoc } from 'firebase/firestore';
import './Newbill.css';

const Newbill = () => {
  const [accountName, setAccountName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState([]);
  const [quantity, setQuantity] = useState({});
  const [searchedItems, setSearchedItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      if (searchTerm) {
        try {
          const itemsRef = collection(db, 'items');
          const q = query(itemsRef, where('itemName', '>=', searchTerm), where('itemName', '<=', searchTerm + '\uf8ff'));
          const querySnapshot = await getDocs(q);

          const filteredItems = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          console.log('Fetched items:', filteredItems); // Debugging line
          setSearchedItems(filteredItems);
        } catch (error) {
          console.error('Error fetching items:', error);
        }
      } else {
        setSearchedItems([]);
      }
    };

    fetchItems();
  }, [searchTerm]);

  const handleAccountNameChange = (event) => {
    setAccountName(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleAddItem = (item) => {
    if (!items.find(existingItem => existingItem.id === item.id)) {
      setItems([...items, item]);
      setQuantity({ ...quantity, [item.itemName]: 1 });
    } else {
      setQuantity({ ...quantity, [item.itemName]: quantity[item.itemName] + 1 });
    }
    setSearchTerm('');
    setSearchedItems([]);
  };

  const increaseQuantity = (itemName) => {
    setQuantity({ ...quantity, [itemName]: quantity[itemName] + 1 });
  };

  const decreaseQuantity = (itemName) => {
    if (quantity[itemName] > 1) {
      setQuantity({ ...quantity, [itemName]: quantity[itemName] - 1 });
    } else {
      deleteItem(itemName);
    }
  };

  const deleteItem = (itemName) => {
    const updatedItems = items.filter((item) => item.itemName !== itemName);
    setItems(updatedItems);
    const { [itemName]: removedItem, ...updatedQuantity } = quantity;
    setQuantity(updatedQuantity);
  };

  const createBill = async () => {
    if (items.length === 0) {
      alert('Add items to the bill');
      return;
    }

    const newWindow = window.open('', 'NewWindow', 'width=500,height=500');
    const timestamp = new Date().toLocaleString();
    const totalCost = items.reduce((total, item) => total + item.price * quantity[item.itemName], 0);
    const gst = totalCost * 0.08;
    const finalTotal = totalCost + gst;

    const billContent = `
      <html>
        <head>
          <title>Invoice</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              color: #000000;
              background-color: #ffffff;
            }
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid #000000;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
            .total {
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <h1>Invoice</h1>
          <p><strong>Account No.:</strong> ${accountName}</p>
          <p><strong>Timestamp:</strong> ${timestamp}</p>
          <table>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${items.map(item => `
                <tr>
                  <td>${item.itemName}</td>
                  <td>${quantity[item.itemName]}</td>
                  <td>$${item.price.toFixed(2)}</td>
                  <td>$${(item.price * quantity[item.itemName]).toFixed(2)}</td>
                </tr>
              `).join('')}
              <tr>
                <td colspan="3" class="total">Subtotal</td>
                <td class="total">$${totalCost.toFixed(2)}</td>
              </tr>
              <tr>
                <td colspan="3" class="total">GST (8%)</td>
                <td class="total">$${gst.toFixed(2)}</td>
              </tr>
              <tr>
                <td colspan="3" class="total">Total</td>
                <td class="total">$${finalTotal.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </body>
      </html>
    `;

    newWindow.document.write(billContent);
    newWindow.document.close();

    try {
      await addDoc(collection(db, 'invoices'), {
        accountName,
        timestamp,
        items: items.map(item => ({
          itemName: item.itemName,
          quantity: quantity[item.itemName],
          price: item.price,
          total: item.price * quantity[item.itemName],
        })),
        subtotal: totalCost,
        gst,
        total: finalTotal
      });
      alert('Invoice created and saved successfully!');
    } catch (error) {
      console.error('Error saving invoice:', error);
      alert(`Error saving invoice: ${error.message}`);
    }
  };

  return (
    <div className="newbill-container">
      <Header />
      <div className="newbill-content">
        <div className="account-name">
          <input
            type="text"
            placeholder="Account No."
            value={accountName}
            onChange={handleAccountNameChange}
          />
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchedItems.length > 0 && (
            <ul className="searched-items">
              {searchedItems.map((item) => (
                <li key={item.id}>
                  {item.itemName} - ${item.price}
                  <button className="add-button" onClick={() => handleAddItem(item)}>Add</button>
                </li>
              ))}
            </ul>
          )}
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
                <tr key={item.id}>
                  <td>{item.itemName}</td>
                  <td>
                    <button onClick={() => decreaseQuantity(item.itemName)}>-</button>
                    {quantity[item.itemName]}
                    <button onClick={() => increaseQuantity(item.itemName)}>+</button>
                  </td>
                  <td>${item.price}</td>
                  <td>
                    <button onClick={() => deleteItem(item.itemName)}>Delete</button>
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
