import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './Styles/App.css';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/HomePage';
import ShoppingListPage from './pages/ShoppingListPage';
import EditorPage from './pages/EditorPage';
import NotFoundPage from './pages/NotFoundPage';
import { Navbar, Container, Nav, Dropdown, Button } from 'react-bootstrap';
import ShoppingListForm from "./components/ShoppingListForm";


function App() {  // komponenta pro zobrazení celé aplikace

  const translations = {
    owner: {
      en: 'Owner',
      cs: 'Vlastník',
    },
    user: {
      en: 'User',
      cs: 'Uživatel',
    },
    activeUser: {
      en: 'Active user',
      cs: 'Aktivní uživatel',
    },
    shoppingListPage: {
      en: 'Shopping list page',
      cs: 'Stránka nákupních seznamů',
    },
    homePage: {
      en: 'Home page',
      cs: 'Domovská stránka',
    },
    setFilterAllLists: {
      en: 'All lists',
      cs: 'Všechny seznamy',
    },
    setFilterActiveLists: {
      en: 'Active lists',
      cs: 'Aktivní seznamy',
    },
    visibleShoppingLists: {
      en: 'Visible all lists: ',
      cs: 'Zobrazit seznamy: ',
    },
    darkMode: {
      en: 'Dark mode',
      cs: 'Tmavý mód',
    },
    brightMode: {
      en: 'Bright mode',
      cs: 'Světlý mód',
    },
  };

  const [logInUser, setLogInUser] = useState(4586623265);
  const handleUserSelect = (user) => { setLogInUser(user); };

  const [visibleLists, setVisibleLists] = useState(true);
  const handleVisibleSelect = (list) => { setVisibleLists(list); };

  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  console.log('is modd', isDarkMode);

  const [isEnglish, setIsEnglish] = useState(true)
  const toggleLanguageMode = () =>  setIsEnglish(!isEnglish);

  return (
    <div>
      <Router>  
        <div>
          <Navbar className="fw-bold" expand="lg" >
            <Container>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link as={Link} to="/">
                  {`${translations.homePage[isEnglish ? 'en' : 'cs']}`}
                  </Nav.Link>
                  <Nav.Link as={Link} to="/ShoppingListPage">
                  {`${translations.shoppingListPage[isEnglish ? 'en' : 'cs']}`}
                  </Nav.Link>
                  <Nav.Link as={Link} to={`/EditorPage/${logInUser}`}>
                  </Nav.Link>
                </Nav>
                <Dropdown>
                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                    {`${translations.activeUser[isEnglish ? 'en' : 'cs']}`}
                    </Dropdown.Toggle>
                     <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleUserSelect(4586623265)}>
                        {`${translations.owner[isEnglish ? 'en' : 'cs']}: 
                        Jirka 4586623265`}</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleUserSelect(1234567890)}>
                        {`${translations.user[isEnglish ? 'en' : 'cs']}: 
                        Anna 1234567890`}</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleUserSelect(7777777777)}>
                        {`${translations.user[isEnglish ? 'en' : 'cs']}: 
                        Jessica 7777777777`}</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
               <Dropdown.Toggle variant="warning" id="dropdown-basic">
               {`${translations.visibleShoppingLists[isEnglish ? 'en' : 'cs']}`}
               </Dropdown.Toggle>
              <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleVisibleSelect(true)}>
              {`${translations.setFilterAllLists[isEnglish ? 'en' : 'cs']}`}
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleVisibleSelect(false)}>
              {`${translations.setFilterActiveLists[isEnglish ? 'en' : 'cs']}`}
              </Dropdown.Item>
              </Dropdown.Menu>
                </Dropdown>
                <Button onClick={toggleDarkMode}>
                  {isDarkMode ? (
                    `${translations.brightMode[isEnglish ? 'en' : 'cs']}`
                  ) : (
                    `${translations.darkMode[isEnglish ? 'en' : 'cs']}`
                  )}
                </Button>
                <Button onClick={toggleLanguageMode}>
                      {isEnglish ? 'Čeština' : 'English'}
                </Button>
                
                </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
        <Routes>
          <Route index element={<HomePage isEnglish={isEnglish}/>} />
          <Route path="/" element={<HomePage/>} />
          <Route
            path="ShoppingListPage"
            element={<ShoppingListPage isEnglish={isEnglish} logInUser={logInUser} visibleLists={visibleLists} />}
          />
          <Route
            path="/EditorPage/:displayListId" component={ShoppingListForm}   
            element={<EditorPage isEnglish={isEnglish} logInUser={logInUser} />}
          />
          <Route path="/*" element={<NotFoundPage isEnglish={isEnglish}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

