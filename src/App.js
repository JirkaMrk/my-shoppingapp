import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import ShoppingListPage from './pages/ShoppingListPage';
import NotFoundPage from './pages/NotFoundPage';
import NavBar from "./components/NavBar";


function App() {
  return (
    <div>
      <BrowserRouter>
          <div>
           <NavBar />
          </div>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="ShoppingListPage" element={<ShoppingListPage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
