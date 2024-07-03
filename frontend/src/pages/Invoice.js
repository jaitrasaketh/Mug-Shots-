import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../layout/header';
import Footer from '../layout/footer';
import { db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const Invoice = () => {
  const { invoiceId } = useParams();
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const invoiceRef = doc(db, 'invoices', invoiceId);
        const docSnap = await getDoc(invoiceRef);

        if (docSnap.exists()) {
          setInvoice(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching invoice:', error);
      }
    };

    fetchInvoice();
  }, [invoiceId]);

  if (!invoice) {
    return <div>Loading...</div>;
  }

  return (
    <div className="invoice-container">
      <Header />
      <div className="invoice-content">
        <h2>Invoice</h2>
        <div className="invoice-details">
          <p><strong>Account Name:</strong> {invoice.accountName}</p>
          <p><strong>Date:</strong> {invoice.timestamp}</p>
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
              {invoice.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.itemName}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price}</td>
                  <td>${item.total}</td>
                </tr>
              ))}
              <tr>
                <td colSpan="3"><strong>Subtotal</strong></td>
                <td>${invoice.subtotal}</td>
              </tr>
              <tr>
                <td colSpan="3"><strong>GST</strong></td>
                <td>${invoice.gst}</td>
              </tr>
              <tr>
                <td colSpan="3"><strong>Total</strong></td>
                <td>${invoice.total}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Invoice;
