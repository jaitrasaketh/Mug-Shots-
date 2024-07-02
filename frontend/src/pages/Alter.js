import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';
import Header from '../layout/header';
import Footer from '../layout/footer';
import './Alter.css'; // Ensure Alter.css is imported for styling

const Alter = () => {
  const location = useLocation();
  const { item } = location.state;
  const [itemName, setItemName] = useState(item.itemName);
  const [category, setCategory] = useState(item.category);
  const [price, setPrice] = useState(item.price);
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const itemDocRef = doc(db, 'items', item.id);
      await updateDoc(itemDocRef, {
        itemName,
        category,
        price,
      });
      alert('Item updated successfully!');
      navigate('/delete'); // Redirect back to the delete page after updating
    } catch (error) {
      console.error('Error updating item:', error);
      alert(`Error updating item: ${error.message}`);
    }
  };

  return (
    <div>
      <Header />
      <div className="alter-container">
        <div className="alter-form-container">
          <h2 style={{ color: '#FFFFFF' }}>Alter Item</h2>
          <form onSubmit={handleUpdate} className="alter-form">
            <label>
              Item Name:
              <input
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                required
              />
            </label>
            <label>
              Category:
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="Beverage">Beverage</option>
                <option value="Dessert">Dessert</option>
              </select>
            </label>
            <label>
              Price:
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </label>
          </form>
        </div>
        <button type="submit" className="update-button" onClick={handleUpdate}>Update Item</button>
      </div>
      <Footer />
    </div>
  );
};

export default Alter;
