import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import FarmerNavbar from './FarmerNavbar';

function Seedconcept() {
    const location = useLocation();
    const email = location.state?.email || sessionStorage.getItem('email');
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                console.log('Fetching data for email:', email); // Log email
                const response = await fetch(`http://localhost:6900/api/products/orderdetails/farmer/${email}`);
                console.log('Response status:', response.status); // Log response status
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Fetched data:', data); // Log fetched data
                setOrderDetails(data);
            } catch (error) {
                console.error('Fetch error:', error.message); // Log error
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (email) {
            fetchOrderDetails();
        }
    }, [email]);

    return (
        <div>
            <FarmerNavbar />
            <div style={styles.container}>
                <h2>Seed Concept Page</h2>
                <p>Email: {email}</p>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                {orderDetails ? (
                    <div>
                        <p>Order ID: {orderDetails.id}</p>
                        <p>Vegetable Name: {orderDetails.vegetableName}</p>
                        <p>Category: {orderDetails.category}</p>
                        <p>Farmer Email: {orderDetails.farmerEmail}</p>
                        <p>Customer Email: {orderDetails.customerEmail}</p>
                    </div>
                ) : (
                    !loading && <p>No details available</p>
                )}
            </div>
        </div>
    );
}

const styles = {
    container: {
        padding: '20px',
        textAlign: 'center',
    },
};

export default Seedconcept;
