import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './Styles/App.css';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/HomePage';
import ShoppingListPage from './pages/ShoppingListPage';
import EditorPage from './pages/EditorPage';
import NotFoundPage from './pages/NotFoundPage';
import { Navbar, Container, Nav, Dropdown } from 'react-bootstrap';
import ShoppingListForm from "./components/ShoppingListForm";

function App() {  // komponenta pro zobrazení celé aplikace
  const [logInUser, setLogInUser] = useState(4586623265);
  const handleUserSelect = (user) => { setLogInUser(user); };

  const [visibleLists, setVisibleLists] = useState(true);
  const handleVisibleSelect = (list) => { setVisibleLists(list); };

  return (
    <div>
      <Router>  
        <div>
          <Navbar className="fw-bold" expand="lg">
            <Container>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link as={Link} to="/">Home page</Nav.Link>
                  <Nav.Link as={Link} to="/ShoppingListPage">Shopping list page</Nav.Link>
                  <Nav.Link as={Link} to={`/EditorPage/${logInUser}`}>
                    Editor page
                  </Nav.Link>
                </Nav>
                <Dropdown>
                  <Dropdown.Toggle variant="light" id="dropdown-basic">
               Active user {logInUser}
            </Dropdown.Toggle>
              <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleUserSelect(4586623265)}>Owner: Jirka 4586623265</Dropdown.Item>
              <Dropdown.Item onClick={() => handleUserSelect(1234567890)}>User: Anna 1234567890</Dropdown.Item>
              <Dropdown.Item onClick={() => handleUserSelect(7777777777)}>User: Jessica 7777777777</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
            <Dropdown.Toggle variant="warning" id="dropdown-basic">
               Visible all cards list {visibleLists.toString()} 
            </Dropdown.Toggle>
              <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleVisibleSelect(true)}>Visible all lists</Dropdown.Item>
              <Dropdown.Item onClick={() => handleVisibleSelect(false)}>Visible only active lists</Dropdown.Item>
              </Dropdown.Menu>
                </Dropdown>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/" element={<HomePage />} />
          <Route
            path="ShoppingListPage"
            element={<ShoppingListPage logInUser={logInUser} visibleLists={visibleLists} />}
          />
          <Route
            path="/EditorPage/:displayListId" component={ShoppingListForm}   
            element={<EditorPage logInUser={logInUser} />}
          />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

