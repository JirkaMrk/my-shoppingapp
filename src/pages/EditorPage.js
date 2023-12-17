import React from 'react';
import { Container } from 'react-bootstrap';
import ShoppingListForm from '../components/ShoppingListForm';

function EditorPage({logInUser, isEnglish}) {  // komponenta pro zobrazení formuláře seznamu
    
  return (
    <Container className='mt-4'>
          <ShoppingListForm logInUser={logInUser} isEnglish={isEnglish}/>
        </Container>  
  );
}

export default EditorPage;

