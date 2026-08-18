import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import HomeNavbar from './HomeNavbar';
import axios from 'axios';

function CustomerRegister() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phonenum, setPhonenum] = useState('');
  const [emailid, setEmailid] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false || !passwordValid) {
      event.stopPropagation();
    } else {
      try {
        const response = await axios.post('http://localhost:6900/api/sathish/customer', {
          firstName,
          lastName,
          phonenum,
          emailid,
          password
        });
        if (response.data) {
          setMessage('Registration successful!');
          setMessageType('success');
          setShowMessage(true);
          setTimeout(() => {
            navigate('/customerlogin'); // Navigate to login page after registration
          }, 2000);
        } else {
          setMessage('EmailId already registered.  Use another emailid');
          setMessageType('danger');
          setShowMessage(true);
        }
      } catch (error) {
        setMessage('EmailId already registered.  Use another emailid');
        setMessageType('danger');
        setShowMessage(true);
      }
    }
    setValidated(true);
  };

  const validatePassword = (value) => {
    // Regex for password validation: at least one uppercase, one lowercase, one special character, length between 10 and 14
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,14}$/;
    return regex.test(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    setPasswordValid(validatePassword(value));
  };

  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value);
  };

  const bgImageStyle = {
    backgroundImage: 'url(https://png.pngtree.com/thumb_back/fh260/back_our/20190620/ourmid/pngtree-summer-atmosphere-restaurant-supermarket-vegetable-psd-layered-promotion-background-image_159939.jpg)', // Replace with your image path
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
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '91.7vh',color:'white' }}>
          <Row className="w-100">
            <Col md={{ span: 6, offset: 3 }}>
              <Form noValidate validated={validated} onSubmit={handleSubmit} className="p-4" style={{boxShadow:'2px 4px black',backgroundColor:'rgba(73, 72, 72, 0.521)',borderRadius:'5px'}}>
              <h2 style={{textAlign:'center'}}><strong>CUSTOMER REGISTRATION FORM</strong></h2>
                <Form.Group controlId="formBasicFirstName">
                  <Form.Label><strong>FIRST NAME</strong></Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter first name..."
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid first name.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicLastName">
                  <Form.Label><strong>LAST NAME</strong></Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid last name.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicPhoneNum">
                  <Form.Label><strong>PHONE NUMBER</strong></Form.Label>
                  <Form.Control
                    required
                    type="tel"
                    placeholder="Enter phone number"
                    value={phonenum}
                    onChange={(e) => setPhonenum(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid phone number.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label><strong>EMAIL ID</strong></Form.Label>
                  <Form.Control
                    required
                    type="email"
                    placeholder="Enter email"
                    value={emailid}
                    onChange={(e) => setEmailid(e.target.value)}
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
                    placeholder="Password"
                    value={password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Password must contain at least one uppercase, one lowercase, one special character (@$!%*?&), and be between 10-14 characters.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicConfirmPassword">
                  <Form.Label><strong>CONFIRM PASSWORD</strong></Form.Label>
                  <Form.Control
                    required
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                    isInvalid={validated && password !== confirmPassword}
                  />
                  <Form.Control.Feedback type="invalid">
                    Passwords do not match.
                  </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 mt-3">
                  <strong>REIGSTER</strong>
                </Button>
                <div className="mt-3 text-center" >
                  <a style={{color:'lightgreen'}} href="/customerlogin">Already registered? Click here to login.</a>
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

export default CustomerRegister;
