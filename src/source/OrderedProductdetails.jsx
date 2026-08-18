import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal, Form, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomerNavbar from './CustomerNavbar';

function OrderedProductdetails() {
  const [products, setProducts] = useState([]);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cardNumberError, setCardNumberError] = useState('');

  useEffect(() => {
    // Retrieve email from session storage
    const storedEmail = sessionStorage.getItem('email') || '';
    setEmail(storedEmail);

    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:6900/api/products/orderdetails/customer/${storedEmail}`);
        setProducts(response.data);
      } catch (err) {
        setError('Failed to fetch products');
      }
    };

    fetchProducts();
  }, []);

  const handlePayClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    setCardNumberError('');
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    const cardNumber = e.target.formCardNumber.value;
    const amount = selectedProduct?.totalPrice;
    
    // Validate card number
    if (cardNumber.length !== 12 || isNaN(cardNumber)) {
      setCardNumberError('Card number must be exactly 12 digits.');
      return;
    }

    setCardNumberError(''); // Clear any previous error

    console.log('Product ID:', selectedProduct.id);
    console.log('Paid Amount:', amount);
    
    try {
      await axios.put(`http://localhost:6900/api/products/orderdetails/updatePaidAmount/${selectedProduct.id}`, {
        paidAmount: amount
      });
      alert('Payment successful');
      // Update the products list after payment
      setProducts(products.map(product => product.id === selectedProduct.id ? { ...product, paidAmount: amount } : product));
    } catch (error) {
      console.error('Error updating paid amount:', error);
      alert('Failed to process payment');
    }
    
    setShowModal(false);
  };

  const getPaymentStatusClass = (product) => {
    return product.totalPrice === product.paidAmount ? 'paid' : 'unpaid';
  };

  return (
    <div>
      <CustomerNavbar />
      <div className="product-details">
        <h1>ORDER DETAILS</h1>
        {error && <p className="error">{error}</p>}
        <div className="product-list">
          {products.length > 0 ? (
            products.map(product => (
              <div key={product.id} className={`product-card ${getPaymentStatusClass(product)}`}>
                <img
                  src={`data:image/jpeg;base64,${product.vegetableImage}`}
                  alt={product.vegetableName}
                  className="image"
                />
                <h2 className="product-name">{product.vegetableName}</h2>
                <p className="product-price">₹{product.totalPrice}</p>
               
                {product.totalPrice !== product.paidAmount && (
                  <Button variant="success" className="pay-button" onClick={() => handlePayClick(product)}>
                    <strong>PAY</strong>
                  </Button>
                )}
              </div>
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
        <style>
          {`
            .product-details {
              padding: 20px;
              background-color: #f8f9fa;
            }
            .product-list {
              display: flex;
              flex-wrap: wrap;
              gap: 20px;
            }
            .product-card {
              position: relative;
              background: #ffffff;
              padding: 15px;
              border-radius: 8px;
              box-shadow: 0 0 5px rgba(0, 0, 0, 0.20);
              text-align: center;
              width: 200px;
              transition: transform 0.3s ease;
              cursor:pointer;
            }
            .product-card.paid {
              border: 2px solid green;
            }
            .product-card.unpaid {
              border: 2px solid red;
            }
            .product-card:hover {
              transform: scale(1.05);
            }
            .image {
              width: 100%;
              height: 150px;
              object-fit: cover;
              border-radius: 4px;
            }
            .product-name {
              font-size: 1.2rem;
              margin: 10px 0;
            }
            .product-price {
              font-size: 1.2rem;
              font-weight: bold;
              color: #28a745;
            }
            .pay-button {
              position: absolute;
              bottom: 15px;
              left: 50%;
              transform: translateX(-50%);
              opacity: 0;
              transition: opacity 0.3s ease;
            }
            .product-card:hover .pay-button {
              opacity: 1;
            }
            .error {
              color: red;
              font-weight: bold;
            }
          `}
        </style>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>PAYMENT DETAILS</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handlePaymentSubmit}>
            <Form.Group controlId="formCardNumber">
              <Form.Label>CREDIT CARD / DEBIT CARD NUMBER</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter card number" 
                required 
                maxLength={12}
              />
              {cardNumberError && <Alert variant="danger">{cardNumberError}</Alert>}
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>EMAIL</Form.Label>
              <Form.Control 
                type="text" 
                value={email}
                disabled 
              />
            </Form.Group>
            <Form.Group controlId="formAmount">
              <Form.Label>AMOUNT</Form.Label>
              <Form.Control 
                type="text" 
                value={selectedProduct ? `₹${selectedProduct.totalPrice}` : ''} 
                disabled 
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              <strong>PAY</strong>
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default OrderedProductdetails;
