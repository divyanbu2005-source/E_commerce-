import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Button, Form, Image, Alert } from 'react-bootstrap';
import { FaCheckCircle, FaTruck, FaTag } from 'react-icons/fa';
import CustomerNavbar from './CustomerNavbar';
import axios from 'axios';

function CustomerProduct() {
  const location = useLocation();
  const { product } = location.state || {};
  const customerEmail = location.state?.email || ''; // Read customer email from location state
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('kg');
  const [message, setMessage] = useState(''); // State for message
  const [alertVariant, setAlertVariant] = useState(''); // State for alert variant

  // Example categories, this could be dynamic if fetched from an API or state
  const categories = ['Vegetables', 'Fruits', 'Dairy'];

  if (!product) {
    return <p>No product details available</p>;
  }

  const handleAddToCart = async () => {
    if (!quantity) {
      setMessage('Please enter the quantity');
      setAlertVariant('warning'); // Set alert variant to warning
      return;
    }

    const totalPrice = product.price * quantity; // Calculate total price locally

    const cartItem = {
      vegetableName: product.vegetableName,
      quantity: quantity,
      price: product.price, // Store unit price here
      totalPrice: totalPrice, // Store total price here
      category: product.category,
      farmerEmail: product.email, // Send farmer email
      customerEmail: customerEmail, // Send customer email
      vegetableImage: product.vegetableImage,
      amount: product.price, // Send amount (price per unit)
    };

    try {
      const response = await axios.post('http://localhost:6900/api/products/orderdetails', cartItem);
      if (response.status === 200 || response.status === 201) {
        setMessage('Added to cart successfully'); // Simplified success message
        setAlertVariant('success'); // Set alert variant to success
      } else {
        setMessage('Failed to add to cart');
        setAlertVariant('danger'); // Set alert variant to danger
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      setMessage('Failed to add to cart');
      setAlertVariant('danger'); // Set alert variant to danger
    }
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setQuantity(value);
    }
  };

  return (
    <div>
      <CustomerNavbar categories={categories} />
      <Container className="mt-4">
        <Row>
          <Col>
            <Image
              src={`data:image/jpeg;base64,${product.vegetableImage}`}
              alt={product.vegetableName}
              rounded
              fluid
              style={{ width: '100%', height: 'auto', border: '1px solid gray', cursor: 'pointer' }}
            />
          </Col>
          <Col md={6}>
            <h1>{product.vegetableName}</h1>
            <p style={{ textAlign: 'justify' }}>{product.description}</p>
            <p><strong>PRICE: ₹{product.price}</strong></p>
            <p><strong>CATEGORY:</strong> {product.category}</p>
            <p><strong>SELLER EMAIL:</strong> {product.email}</p>
            <p><strong>SELLER NAME:</strong> {product.name}</p>
            <p><strong>CITY / VILLAGE:</strong> {product.city}</p>
            <Form.Group controlId="formQuantity">
              <Form.Label>QUANTITY</Form.Label>
              <Row>
                <Col md={8}>
                  <Form.Control
                    type="text"
                    placeholder="Enter quantity"
                    value={quantity}
                    onChange={handleQuantityChange}
                  />
                </Col>
                <Col md={4}>
                  <Form.Control
                    as="select"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                  >
                    <option value="kg">KG</option>
                    {/* Add more units if needed */}
                  </Form.Control>
                </Col>
              </Row>
            </Form.Group>
            <Button variant="outline-danger" className="mt-3" onClick={handleAddToCart}>
              <strong>ADD TO CART</strong>
            </Button>
            {message && (
              <div className="mt-3">
                <Alert variant={alertVariant}>
                  {message}
                </Alert>
              </div>
            )}
          </Col>
        </Row>
      </Container>
      <Container className="mt-4" style={{ cursor: 'pointer' }}>
        <Row className="quality-row">
          <h6 style={{ textAlign: 'center' }}>Why choose Vivasayee Nanban?</h6>
          <br />
          <Col className="quality-item text-center">
            <FaCheckCircle size={24} />
            <p>Quality</p>
          </Col>
          <Col className="quality-item text-center">
            <FaTag size={24} />
            <p>On Time Guarantee</p>
          </Col>
          <Col className="quality-item text-center">
            <FaTruck size={24} />
            <p>Free Delivery</p>
          </Col>
        </Row>
      </Container>
      <style>{`
        .quality-row {
          display: flex;
          justify-content: space-around;
          align-items: center;
          margin-top: 20px;
          padding: 10px;
          border-top: 1px solid #ddd;
        }

        .quality-item {
          text-align: center;
        }

        .quality-item p {
          margin-top: 8px;
          font-size: 14px;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}

export default CustomerProduct;
