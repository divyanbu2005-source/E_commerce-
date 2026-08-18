import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Container } from 'react-bootstrap';
import FarmerNavbar from './FarmerNavbar';
import AdminNavbar from './AdminNavbar';

function Seedconceptviewdetails() {
    const [productDetails, setProductDetails] = useState([]);

    useEffect(() => {
        fetchProductDetails();
    }, []);

    const fetchProductDetails = async () => {
        try {
            const response = await axios.get('http://localhost:6900/api/seedconcepts');
            setProductDetails(response.data);
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

    return (
        <div>
            <AdminNavbar />
            <br />
            <h1 style={{ textAlign: 'center' }}><strong>SEED CONCEPT DETAILS</strong></h1>
            <br />
            <Container>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>FARMER EMAIL</th>
                            <th>IMAGES</th>
                            <th>DESCRIPTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productDetails.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.email}</td>
                                <td>
                                    {product.image && (
                                        <img
                                            src={`data:image/jpeg;base64,${product.image}`}
                                            alt="Product"
                                            style={{ width: '100px', height: '100px' }}
                                        />
                                    )}
                                </td>
                                <td>{product.description}</td>
                              
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
}

export default Seedconceptviewdetails;
