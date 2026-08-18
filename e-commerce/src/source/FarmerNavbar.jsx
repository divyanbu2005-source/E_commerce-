import React, { useEffect } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';

function FarmerNavbar({ image, email }) {
    useEffect(() => {
        if (email) {
            sessionStorage.setItem('farmerEmail', email);
        }
    }, [email]);

    const handleLogout = () => {
        console.log('Logout button clicked');
        sessionStorage.removeItem('farmerEmail');
        window.location.href = '/'; // Adjust the path as needed
    };

    return (
        <div>
            <Navbar className="custom-navbar" expand="lg">
                <Navbar.Brand className="navbar-brand"><strong>VYAVASAYEE NANBAN</strong></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/farmerhomepage" className="nav-link"><strong>HOME PAGE</strong></Nav.Link>
                        <Nav.Link href="/farmerorderdetails" className="nav-link"><strong>ORDER DETAILS</strong></Nav.Link>
                    </Nav>
                    {image && (
                        <img src={`data:image/jpeg;base64,${image}`} alt="Profile" style={{ width: 50, height: 50, borderRadius: '50%', objectFit: 'cover', marginLeft: 'auto' }} />
                    )}&nbsp;&nbsp;
                    {email && <span className="text-light">Welcome, {email}</span>}
                    <Button onClick={handleLogout} style={{ backgroundColor: 'red', marginLeft: 10 }}><strong>LOGOUT</strong></Button>
                    &nbsp;&nbsp;&nbsp;
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default FarmerNavbar;
