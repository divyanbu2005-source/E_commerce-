import React, { useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import HomeNavbar from './HomeNavbar';

function FarmerRegister() {
  const navigate = useNavigate(); // useNavigate hook for navigation

  const [formData, setFormData] = useState({
    name: '',
    city: '',
    phonenum: '',
    emailid: '',
    password: '',
    image: null,
  });
  const [isLoading, setIsLoading] = useState(false); // State to manage loading state
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state

    const data = new FormData();
    data.append('name', formData.name);
    data.append('city', formData.city);
    data.append('phonenum', formData.phonenum);
    data.append('emailid', formData.emailid);
    data.append('password', formData.password);
    data.append('image', formData.image);

    try {
      const response = await axios.post('http://localhost:6900/api/sathish/farmer', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      // Handle success - maybe clear the form or show a success message
      setSuccessMessage('Registration successful! Redirecting...');
      setTimeout(() => {
        navigate('/farmerloginpage'); // Redirect after 2 seconds
      }, 2000);
    } catch (error) {
      console.error('There was an error!', error);
      // Handle error - show an error message
      alert('EmailID is already registered. Try using another emailId');
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div>
      <HomeNavbar/>
    <div style={{ backgroundImage: 'url(https://e0.pxfuel.com/wallpapers/578/586/desktop-wallpaper-agriculture-background-agriculture-agriculture-farm-background-and-agriculture-background-cute-farm.jpg)', backgroundSize: 'cover', minHeight: '92vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className=" p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '8px', maxWidth: '400px',cursor:'pointer' }}>
        <h2 className="mb-4"><strong>FARMER REGISTRATION FORM</strong></h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label><strong>NAME</strong></Form.Label>
            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="formCity">
            <Form.Label><strong>CITY</strong></Form.Label>
            <Form.Control type="text" name="city" value={formData.city} onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="formPhone">
            <Form.Label><strong>PHONE NUMBER</strong></Form.Label>
            <Form.Control type="text" name="phonenum" value={formData.phonenum} onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label><strong>EMAIL ID</strong></Form.Label>
            <Form.Control type="email" name="emailid" value={formData.emailid} onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label><strong>PASSWORD</strong></Form.Label>
            <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="formImage">
            <Form.Label><strong>UPLOAD PROFILE IMAGE</strong></Form.Label>
            <Form.Control type="file" name="image" onChange={handleChange} required />
          </Form.Group>
          <br/>
          <Button variant="primary" type="submit" disabled={isLoading}>
            
            {isLoading ? (
              <>
                <Spinner animation="border" size="sm" /> Registering...
              </>
            ) : (
              'REGISTER'
            )}
          </Button>
          <div className="mt-3 text-center" >
                  <a href="/farmerloginpage" style={{color:'blue'}}>Already registered? click here for login</a>
                </div>
        </Form>
        {successMessage && <p className="mt-3" style={{color:'green'}}>{successMessage}</p>}
      </div>
    </div>
    </div>
  );
}

export default FarmerRegister;
