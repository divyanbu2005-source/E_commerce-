import React, { useState } from 'react';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import HomeNavbar from './HomeNavbar';

function Adminlogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      setError(false);
      navigate('/adminhomepage'); // Navigate to the dashboard or any other route
    } else {
      setError(true);
    }
  };

  return (
    <div style={styles.page}>
      <HomeNavbar />
      <div style={styles.container}>
        <Container>
          <Row className="justify-content-center align-items-center" style={{ minHeight: '91.7vh' }}>
            <Col md={4}>
              <Form onSubmit={handleSubmit} style={styles.form}>
                <h2 className="text-center"><strong>ADMIN LOGIN FORM</strong></h2>
                {error && <Alert variant="danger">Incorrect credentials</Alert>}
                <Form.Group controlId="formUsername">
                  <Form.Label><strong>USERNAME</strong></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label><strong>PASSWORD</strong></Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" style={styles.button}>
                   <strong>LOGIN</strong>
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

const styles = {
  page: {
    overflow: 'hidden', // Hide the scrollbar
  },
  container: {
    backgroundImage: 'url("https://us.123rf.com/450wm/murrstock/murrstock1906/murrstock190600039/125335312-e-commerce-online-shopping-digital-marketing-and-sales-business-technology-concept.jpg?ver=6")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '91.7vh',
    display: 'flex',
    alignItems: 'center',
  },
  form: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  },
  button: {
    width: '100%',
    marginTop: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.3s ease-in-out',
  },
};

export default Adminlogin;
