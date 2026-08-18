import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import './HomeNavbar.css'; // Import your custom CSS file

function HomeNavbar() {
  return (
    <Navbar className="custom-navbar" expand="lg">
      <Navbar.Brand className="navbar-brand"><strong>VYAVASAYEE NANBAN</strong></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="/customerlogin" className="nav-link"><strong>CUSTOMER</strong></Nav.Link>
          <Nav.Link href="/farmerloginpage" className="nav-link"><strong>FARMER</strong></Nav.Link>
          <Nav.Link href="/adminlogin" className="nav-link"><strong>ADMIN</strong></Nav.Link>
          <Nav.Link href="/contact" className="nav-link"><strong>CONTACT INFO</strong></Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default HomeNavbar;
