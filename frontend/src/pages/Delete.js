import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Header from '../layout/header';
import Footer from '../layout/footer';

import './Delete.css'; // Ensure Delete.css is imported for styling

const Delete = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'items'));
        const fetchedItems = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setItems(fetchedItems);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    try {
      const itemDocRef = doc(db, 'items', id);
      await deleteDoc(itemDocRef);
      setItems(prevItems => prevItems.filter(item => item.id !== id)); // Update state correctly
      alert('Item deleted successfully!');
    } catch (error) {
      console.error('Error deleting item:', error);
      alert(`Error deleting item: ${error.message}`);
    }
  };

  const handleAlter = (item) => {
    navigate('/alter', { state: { item } });
  };

  return (
    <div>
      <Header />
      <div className="delete-container" style={{ backgroundColor: '#019DB2' }}>
        <div className="delete-content">
          <table>
            <thead>
              <tr>
                <th style={{ color: '#FFFFFF' }}>Item Name</th>
                <th style={{ color: '#FFFFFF' }}>Category</th>
                <th style={{ color: '#FFFFFF' }}>Price</th>
                <th style={{ color: '#FFFFFF' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {items && items.length > 0 && items.map(item => (
                <tr key={item.id}>
                  <td>{item.itemName}</td>
                  <td>{item.category}</td>
                  <td>{item.price}</td>
                  <td>
                    <button onClick={() => handleAlter(item)}>Alter</button>
                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Delete;
