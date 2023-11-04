import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import ShoppingListForm from '../components/ShoppingListForm';

function HomePage() {
    return (
        <Container className='mt-4'>
              <ShoppingListForm/>
            </Container>  
    );
}

export default HomePage;
