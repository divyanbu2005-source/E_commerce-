import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import FarmerNavbar from './FarmerNavbar';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

function FarmerAddproducts() {
    const location = useLocation();
    const { state } = location;

    // Extracting email, city, image, and name from state object
    const { email, city, image, name } = state || {};

    const [vegetableName, setVegetableName] = useState('');
    const [category, setCategory] = useState('');
    const [otherCategory, setOtherCategory] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [vegetableImage, setVegetableImage] = useState(null);
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const categories = ['Leafy green', 'Cruciferous', 'Marrow', 'Root', 'Allium', 'Other'];

    // Handle Add Product button click
    const handleAddProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', email);
        formData.append('name', name);
        formData.append('city', city);
        formData.append('vegetableName', vegetableName);
        formData.append('category', category === 'Other' ? otherCategory : category);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('vegetableImage', vegetableImage);

        try {
            const response = await axios.post('http://localhost:6900/api/products/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setShowMessage(true);
            setMessage('Product added successfully');
            setError('');
        } catch (error) {
            setError('Failed to add product');
            setShowMessage(true);
            setMessage('');
        }
    };

    return (
        <div>
            <FarmerNavbar image={image} />
            <div style={styles.addProductPage}>
                <div style={styles.formContainer}>
                    <h1>ADD PRODUCTS</h1>
                    <Form onSubmit={handleAddProduct}>
                        <Form.Group style={styles.formGroup}>
                            <Form.Label><strong>EMAIL ID</strong></Form.Label>
                            <Form.Control type="text" value={email} disabled style={{ ...styles.input, backgroundColor: 'lightgray' }} />
                        </Form.Group>
                        <Form.Group style={styles.formGroup}>
                            <Form.Label><strong>NAME</strong></Form.Label>
                            <Form.Control type="text" value={name} disabled style={{ ...styles.input, backgroundColor: 'lightgray' }} />
                        </Form.Group>
                        <Form.Group style={styles.formGroup}>
                            <Form.Label><strong>CITY / VILLAGE</strong></Form.Label>
                            <Form.Control type="text" value={city} disabled style={{ ...styles.input, backgroundColor: 'lightgray' }} />
                        </Form.Group>
                        <Form.Group style={styles.formGroup}>
                            <Form.Label><strong>VEGETABLE NAME</strong></Form.Label>
                            <Form.Control
                                type="text"
                                value={vegetableName}
                                onChange={(e) => setVegetableName(e.target.value)}
                                placeholder='Enter the vegetable name'
                                required
                                style={styles.input}
                            />
                        </Form.Group>
                        <Form.Group style={styles.formGroup}>
                            <Form.Label><strong>CATEGORIES</strong></Form.Label>
                            <Form.Control
                                as="select"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                placeholder='Pick up the categories'
                                required
                                style={styles.input}
                            >
                                <option value="">Select a category</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        {category === 'Other' && (
                            <Form.Group style={styles.formGroup}>
                                <Form.Label><strong>OTHER CATEGORY</strong></Form.Label>
                                <Form.Control
                                    type="text"
                                    value={otherCategory}
                                    onChange={(e) => setOtherCategory(e.target.value)}
                                    placeholder='Enter the category '
                                    required
                                    style={styles.input}
                                />
                            </Form.Group>
                        )}
                        <Form.Group style={styles.formGroup}>
                            <Form.Label><strong>PRICE INR</strong></Form.Label>
                            <Form.Control
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder='Enter the price'
                                required
                                style={styles.input}
                            />
                        </Form.Group>
                        <Form.Group style={styles.formGroup}>
                            <Form.Label><strong>DESCRIPTION</strong></Form.Label>
                            <Form.Control
                                as="textarea"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder='Enter about the description'
                                required
                                style={styles.textarea}
                            />
                        </Form.Group>
                        <Form.Group style={styles.formGroup}>
                            <Form.Label><strong>UPLOAD VEGETABLE IMAGE</strong></Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={(e) => setVegetableImage(e.target.files[0])}
                                style={styles.input}
                            />
                        </Form.Group>
                        <Button type="submit" style={styles.button}><strong>ADD PRODUCT</strong></Button>
                    </Form>
                    {showMessage && (
                        <Alert variant={message ? "success" : "danger"} style={styles.alert}>
                            {message || error}
                        </Alert>
                    )}
                </div>
            </div>
        </div>
    );
}

const styles = {
    addProductPage: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'url(https://i.pinimg.com/originals/62/09/d0/6209d01f83e1d6434996ef98f0377f08.jpg) no-repeat center center fixed',
        backgroundSize: 'cover',
        cursor: 'pointer',
        padding: '20px 0' // Added padding to create space between navbar and form
    },
    formContainer: {
        background: 'rgba(63, 62, 62, 0.315)',
        color: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        boxShadow: '5px 3px black',
        marginTop: '60px' // Added margin to create space between navbar and form
    },
    formGroup: {
        marginBottom: '15px',
    },
    input: {
        width: '100%',
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    textarea: {
        width: '100%',
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        resize: 'vertical',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    alert: {
        marginTop: '20px',
    },
    buttonHover: {
        backgroundColor: '#B91E3F',
    }
};

export default FarmerAddproducts;



