import React from 'react';
import { Container } from 'react-bootstrap';
import ShoppingListForm from '../components/ShoppingListForm';

function EditorPage({logInUser}) {  // komponenta pro zobrazení formuláře seznamu
    
  return (
    <Container className='mt-4'>
          <ShoppingListForm logInUser={logInUser}/>
        </Container>  
  );
}

export default EditorPage;

