import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Table, Container } from 'react-bootstrap';
import FarmerNavbar from './FarmerNavbar';

const FarmerProductdetails = () => {
    const location = useLocation();
    const { state } = location;
    const { email } = state || {};

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Log email to console
    console.log('Email:', email);

    useEffect(() => {
        if (email) {
            const fetchProducts = async () => {
                try {
                    const response = await axios.get(`http://localhost:6900/api/products/by-email?email=${email}`);
                    setProducts(response.data);
                } catch (err) {
                    setError('Failed to fetch products');
                } finally {
                    setLoading(false);
                }
            };

            fetchProducts();
        } else {
            setLoading(false);
        }
    }, [email]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (products.length === 0) return <p>No products found</p>;

    return (
        <div>
            <FarmerNavbar />
            <Container style={styles.container}>
                <h1><strong>PRODUCT DETAILS</strong></h1>
                {/* {email && <p>Email: {email}</p>} */}
                <Table striped bordered hover style={styles.table}>
                    <thead>
                        <tr>
                            <th><strong>ID</strong></th>
                            <th><strong>IMAGES</strong></th>
                            <th><strong>VEGETABLE NAMES</strong></th>
                            <th><strong>CATEGORY</strong></th>
                            <th><strong>PRICES</strong></th>
                            <th><strong>DESCRIPTION</strong></th>
                            
                        </tr>
                    </thead>
                    <tbody style={{cursor:'pointer'}}>
                        {products.map((product, index) => (
                            <tr key={product.id}>
                                <td>{index + 1}</td>
                                <td>
                                    {product.vegetableImage && (
                                        <img
                                            src={`data:image/jpeg;base64,${product.vegetableImage}`}
                                            alt={product.vegetableName}
                                            style={styles.image}
                                        />
                                    )}
                                </td>
                                <td>{product.vegetableName}</td>
                                <td>{product.category}</td>
                                <td>{product.price}</td>
                                <td style={{ textAlign: 'justify' }}>{product.description}</td>
                            
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};

const styles = {
    container: {
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
    },
    table: {
        marginTop: '20px',
        backgroundColor: '#fff',
    },
    image: {
        width: '100px',
        height: 'auto',
    },
};

export default FarmerProductdetails;
