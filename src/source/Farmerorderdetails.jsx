import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Container, Button, Modal, Form } from 'react-bootstrap';
import FarmerNavbar from './FarmerNavbar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Farmerorderdetails() {
    const [email, setEmail] = useState('');
    const [productDetails, setProductDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    useEffect(() => {
        const storedEmail = sessionStorage.getItem('farmerEmail');
        if (storedEmail) {
            setEmail(storedEmail);
            fetchProductDetails(storedEmail);
        }
    }, []);

    const fetchProductDetails = async (email) => {
        try {
            const response = await axios.get(`http://localhost:6900/api/products/orderdetails/farmer/${email}`);
            console.log('Fetched Product Details:', response.data); // Log data to console
            setProductDetails(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching product details:', error);
            setLoading(false);
        }
    };

    const handleShowModal = (product) => {
        setSelectedProduct(product);
        setDescription('');
        setImage(null);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedProduct(null);
    };

    const handleImageUpload = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('description', description);
        formData.append('image', image);
        formData.append('email', selectedProduct.farmerEmail); // Use farmerEmail

        try {
            const response = await axios.post('http://localhost:6900/api/seedconcepts/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(response.data);
            toast.success('Uploaded successfully');
            handleCloseModal(); // Close modal on successful upload
        } catch (error) {
            console.error('Error uploading image:', error);
            toast.error('Failed to upload');
        }
    };

    return (
        <div>
            <FarmerNavbar />
            <br />
            <h1 style={{ textAlign: 'center' }}>ORDERED DETAILS</h1>
            <br />
            <br />
            <Container>
                {loading ? (
                    <p>Loading product details...</p>
                ) : (
                    <Table striped bordered hover style={{ backgroundColor: 'black', color: 'white' }}>
                        <thead>
                            <tr>
                                <th>VEGETABLE NAME</th>
                                <th>CATEGORY</th>
                                <th>CUSTOMER EMAIL</th>
                                <th>QUANTITY</th>
                                <th>TOTAL PRICE</th>
                               
                                <th>STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productDetails.map((product, index) => (
                                <tr key={index}>
                                    <td>{product.vegetableName}</td>
                                    <td>{product.category}</td>
                                    <td>{product.customerEmail}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.totalPrice}</td>
                                  
                                    <td
                                        style={{
                                            backgroundColor: product.totalPrice === product.paidAmount ? 'green' : 'red',
                                            color: 'white'
                                        }}
                                    >
                                        {product.totalPrice === product.paidAmount ? 'PAID' : 'UNPAID'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Container>

            {/* Modal for displaying product details */}
            {selectedProduct && (
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Product Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formId">
                                <Form.Label><strong>ID</strong></Form.Label>
                                <Form.Control
                                    type="text"
                                    value={selectedProduct.id}
                                    disabled
                                />
                            </Form.Group>
                            <Form.Group controlId="formDescription">
                                <Form.Label><strong>DESCRIPTION</strong></Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="formFarmerEmail">
                                <Form.Label><strong>FARMER EMAIL</strong></Form.Label>
                                <Form.Control
                                    type="text"
                                    value={selectedProduct.farmerEmail} // Display farmerEmail
                                    disabled
                                />
                            </Form.Group>
                            <Form.Group controlId="formImageUpload">
                                <Form.Label>UPLOAD IMAGES</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setImage(e.target.files[0])}
                                />
                            </Form.Group>
                            <Button
                                variant="primary"
                                onClick={handleImageUpload}
                                style={{ marginTop: '10px' }}
                            >
                                <strong>UPLOAD</strong>
                            </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            <strong>CLOSE</strong>
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}

            {/* Toast Container */}
            <ToastContainer />
        </div>
    );
}

export default Farmerorderdetails;
