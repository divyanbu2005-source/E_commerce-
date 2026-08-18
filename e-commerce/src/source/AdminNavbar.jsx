import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import './HomeNavbar.css'; // Import your custom CSS file

function AdminNavbar() {
  const handleLogout = () => {
    // Perform logout logic here, such as clearing authentication tokens, redirecting, etc.
    console.log('Logout button clicked');
    // Redirect to the login page or any other page after logout
    window.location.href = '/'; // Adjust the path as needed
  };

  return (
    <div>
      <Navbar className="custom-navbar" expand="lg">
        <Navbar.Brand className="navbar-brand"><strong>VYAVASAYEE NANBAN</strong></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          <Nav.Link href="/adminhomepage" className="nav-link"><strong>HOME PAGE</strong></Nav.Link>
            <Nav.Link href="/admincustomerdetails" className="nav-link"><strong>CUSTOMER DETAILS</strong></Nav.Link>
            <Nav.Link href="/adminfarmerdetails" className="nav-link"><strong>FARMER DETAILS</strong></Nav.Link>
            <Nav.Link href="/seedconcepts1" className="nav-link"><strong>SEED CONCEPTS</strong></Nav.Link>
            <Nav.Link href="/blockchain" className="nav-link"><strong>BLOCKCHAIN</strong></Nav.Link>
          </Nav>
          
        </Navbar.Collapse>
        <Button onClick={handleLogout} style={{backgroundColor:'red'}}><strong>LOGOUT</strong></Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </Navbar>
    </div>
  );
}

export default AdminNavbar;
