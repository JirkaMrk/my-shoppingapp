import './App.css';
import React from 'react';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import ShoppingListPage from './pages/ShoppingListPage';
import EditorPage from './pages/EditorPage';
import NotFoundPage from './pages/NotFoundPage';
import { Navbar, Container, Nav, Dropdown } from 'react-bootstrap';



function App() {

  const [logInUser, setLogInUser] = useState(4586623265);
  const handleUserSelect = (user) => {setLogInUser(user);};


  return (
    <div>
      <BrowserRouter> 
          <div>
          <Navbar className="fw-bold" expand="lg" >
           <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            <Nav.Link href="/">Home page</Nav.Link>
            <Nav.Link href="/ShoppingListPage">Shopping list page</Nav.Link>
            <Nav.Link href="/EditorPage">Editor page</Nav.Link>
          </Nav>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
               Active user {logInUser}
            </Dropdown.Toggle>

            <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleUserSelect(4586623265)}>Owner: Jirka 4586623265</Dropdown.Item>
            <Dropdown.Item onClick={() => handleUserSelect(1234567890)}>User: Anna 1234567890</Dropdown.Item>
            <Dropdown.Item onClick={() => handleUserSelect(7777777777)}>User: Jessica 7777777777</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
          </div> 
        <Routes> 
          <Route index element={<HomePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="ShoppingListPage" element={<ShoppingListPage logInUser={logInUser} />} />
          <Route path="EditorPage" element={<EditorPage logInUser={logInUser}/>} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
