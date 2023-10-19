import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import ShoppingListPage from './pages/ShoppingListPage';
import EditorPage from './pages/EditorPage';
import NotFoundPage from './pages/NotFoundPage';
import NavBar from "./components/NavBar";

import './App.css';


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
          <Route path="EditorPage" element={<EditorPage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
