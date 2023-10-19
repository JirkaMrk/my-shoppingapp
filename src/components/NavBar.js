import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

function NavBar() {
  return (
    <Navbar className="fw-bold" expand="lg" >
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home page</Nav.Link>
            <Nav.Link href="/ShoppingListPage">Shopping list page</Nav.Link>
            <Nav.Link href="/EditorPage">Editor page</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Form.Select size="sm" aria-label="Default select example">
      <option>Filtr: Moje nákupní seznamy</option>
      <option value="1">Všechny seznamy</option>
      <option value="2">Moje seznamy</option>
      <option value="3">Sdílené seznamy</option>
      <option value="4">Uzavřené seznamy</option>
    </Form.Select>
      <Form.Select size="sm"  aria-label="Default select example">
      <option>Uživatelé</option>
      <option value="1">Jirka</option>
      <option value="2">Tom</option>
      <option value="3">Martin</option>
    </Form.Select>
    </Navbar>
      
  );
}

export default NavBar;
   