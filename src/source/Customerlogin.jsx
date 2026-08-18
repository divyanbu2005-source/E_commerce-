// Customerlogin.js
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import HomeNavbar from './HomeNavbar';
import axios from 'axios';

function Customerlogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        const response = await axios.post('http://localhost:6900/api/sathish/customer/find', { email, password });
        if (response.data) {
          sessionStorage.setItem('email', email); // Store email in session storage
          setMessage('Login successful!');
          setMessageType('success');
          setShowMessage(true);
          setTimeout(() => {
            navigate('/customerhomepage', { state: { email } });
          }, 2000);
        } else {
          setMessage('Invalid email or password');
          setMessageType('danger');
          setShowMessage(true);
        }
      } catch (error) {
        setMessage('Invalid email or password');
        setMessageType('danger');
        setShowMessage(true);
      }
    }
    setValidated(true);
  };
  

  const bgImageStyle = {
    backgroundImage: 'url(https://i.pinimg.com/originals/6c/55/bb/6c55bb682541f51946025683440b8d10.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  return (
    <div>
      <HomeNavbar />
      <div style={bgImageStyle}>
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '91.9vh', color: 'whitesmoke' }}>
          <Row className="w-100">
            <Col md={{ span: 6, offset: 3 }}>
              <Form noValidate validated={validated} onSubmit={handleSubmit} className="p-4" style={{ boxShadow: '2px 4px black', backgroundColor: 'rgba(73, 72, 72, 0.521)', borderRadius: '5px' }}>
                <h2 style={{ textAlign: 'center' }}><strong>CUSTOMER LOGIN FORM</strong></h2>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label><strong>EMAIL ID</strong></Form.Label>
                  <Form.Control
                    required
                    type="email"
                    placeholder="Enter email...."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid email.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label><strong>PASSWORD</strong></Form.Label>
                  <Form.Control
                    required
                    type="password"
                    placeholder="Enter the password...."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a password.
                  </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 mt-3">
                  LOGIN
                </Button>
                <div className="mt-3 text-center">
                  <a href="/customerregister" style={{ color: 'orange' }}>Not registered? Click here to register.</a>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
      {showMessage && (
        <Alert variant={messageType} className="position-absolute top-50 start-50 translate-middle" onClose={() => setShowMessage(false)} dismissible>
          {message}
        </Alert>
      )}
    </div>
  );
}

export default Customerlogin;
