import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FarmerNavbar from './FarmerNavbar';
import { Container, Row, Col, Button } from 'react-bootstrap';

function Farmerhomepage() {
    const location = useLocation();
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    // Retrieve state or sessionStorage values
    const state = location.state || {
        email: sessionStorage.getItem('email'),
        city: sessionStorage.getItem('city'),
        phonenum: sessionStorage.getItem('phonenum'),
        image: sessionStorage.getItem('image'),
        name: sessionStorage.getItem('name'),
    };

    const { email, city, phonenum, image, name } = state;

    // Store values in sessionStorage when the component mounts
    useEffect(() => {
        if (email) sessionStorage.setItem('email', email);
        if (city) sessionStorage.setItem('city', city);
        if (phonenum) sessionStorage.setItem('phonenum', phonenum);
        if (image) sessionStorage.setItem('image', image);
        if (name) sessionStorage.setItem('name', name);
    }, [email, city, phonenum, image, name]);

    // Function to navigate to Add Products page
    const navigateToAddProducts = () => {
        navigate('/farmeraddproducts', { state: { email, city, phonenum, image, name } });
    };

    // Function to navigate to Product Details page
    const navigateToProductDetails = () => {
        navigate('/farmerproductdetails', { state: { email } });
    };

    // Function to navigate to Seed Concept page
    const navigateToSeedConcept = () => {
        navigate('/seedconcepts', { state: { email } });
    };

    return (
        <div>
            <FarmerNavbar image={image} /> {/* Pass the image as a prop */}
            <div style={styles.farmerHomepage}>
                <Container className="text-center text-white" style={styles.container}>
                    <Row>
                        <Col>
                            <p className="mt-4">
                                Our farmers are dedicated to providing you with the freshest, organic vegetables. Grown with care
                                and free from harmful chemicals, our produce ensures you and your family enjoy healthy and delicious meals.
                            </p>
                            <Button variant="outline-primary" onClick={navigateToAddProducts} className="mt-4">
                                <strong>ADD PRODUCTS</strong>
                            </Button>&nbsp;&nbsp;&nbsp;&nbsp;
                            <Button variant="outline-secondary" onClick={navigateToProductDetails} className="mt-4">
                                <strong>VIEW PRODUCTS</strong>
                            </Button>&nbsp;&nbsp;&nbsp;&nbsp;
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

const styles = {
    farmerHomepage: {
        backgroundImage: 'url(https://images.pexels.com/photos/1198507/pexels-photo-1198507.jpeg?cs=srgb&dl=pexels-grizzlybear-1198507.jpg&fm=jpg)', // Replace with your background image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '91.5vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textShadow: '1px 1px 2px black',
    },
    container: {
        background: 'rgba(0, 0, 0, 0.6)', // Semi-transparent background
        padding: '20px',
        borderRadius: '10px',
    },
};

export default Farmerhomepage;
