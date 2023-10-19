import 'bootstrap/dist/css/bootstrap.min.css';
//import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React from 'react';

function NavBar() {
  return (
    <Navbar expand="lg" style={{ fontWeight: 'bold' }}>
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/ShoppingListPage">My shopping lists</Nav.Link>
         <Navbar.Toggle aria-controls="basic-navbar-nav" />
         <Navbar.Collapse id="basic-navbar-nav">
        <Nav defaultActiveKey="/home" as="ul">
          <NavDropdown title="Shopping list filter" id="basic-nav-dropdown" >
            <NavDropdown.Item href="#action/3.1">All shopping lists</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              My shopping lists
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Shared shopping lists</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Closed shopping lists
            </NavDropdown.Item>
          </NavDropdown>
          </Nav>
      </Navbar.Collapse>
  </Navbar>
  );
}

export default NavBar;
   