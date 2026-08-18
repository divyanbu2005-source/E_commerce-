// ContactInfo.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeNavbar from './HomeNavbar';

const ContactInfo = () => {
  const styles = {
    body: {
      background: 'linear-gradient(135deg, #f8f9fa 25%, #e9ecef 50%, #dee2e6 75%)',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '10px',
      boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',
      maxWidth: '600px',
      width: '100%',
      textAlign: 'center',
    },
    heading: {
      marginBottom: '20px',
      fontSize: '2.5rem',
      animation: 'fadeInDown 1s',
    },
    paragraph: {
      marginBottom: '40px',
      fontSize: '1.2rem',
      animation: 'fadeInUp 1s',
    },
    contactDetails: {
      fontSize: '1.1rem',
      animation: 'fadeInUp 1s',
    },
    '@keyframes fadeInDown': {
      from: { opacity: 0, transform: 'translateY(-20px)' },
      to: { opacity: 1, transform: 'translateY(0)' },
    },
    '@keyframes fadeInUp': {
      from: { opacity: 0, transform: 'translateY(20px)' },
      to: { opacity: 1, transform: 'translateY(0)' },
    },
  };

  return (
    <div>
        <HomeNavbar/>
    <div style={styles.body}>
      <Container style={styles.container}>
        <style>
          {`
            @keyframes fadeInDown {
              from { opacity: 0; transform: translateY(-20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes fadeInUp {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @media (max-width: 768px) {
              h2 {
                font-size: 2rem;
              }
              p {
                font-size: 1rem;
              }
              .contactDetails p {
                font-size: 1rem;
              }
            }
            @media (max-width: 576px) {
              h2 {
                font-size: 1.5rem;
              }
              p {
                font-size: 0.9rem;
              }
              .contactDetails p {
                font-size: 0.9rem;
              }
            }
          `}
        </style>
        <Row>
          <Col>
            <h2 style={styles.heading}><strong>CONTACT INFO</strong></h2>
            <p style={styles.paragraph}>We are here to help you. Please find our contact details below:</p>
            <div className="contactDetails" style={styles.contactDetails}>
              <p>Phone: +1-234-567-890</p>
              <p>Email: support@vegetablemarket.com</p>
            </div>
          </Col>
        </Row>
      </Container>
      </div>
    </div>
  );
};

export default ContactInfo;
