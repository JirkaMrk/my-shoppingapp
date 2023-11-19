import { Button, Container, Modal} from 'react-bootstrap';
import ShoppingCards from '../components/Cards';
import { useState } from 'react';
import NewListModal from '../components/NewListModal';
import data from "../data/data.json";


function ShoppingListPage( {logInUser, visibleLists} ) { // komponenta pro zobrazení seznamu položek

    return (  
      <div>
          <Container className='mt-4'> 
              <ShoppingCards data={data} logInUser={logInUser} visibleLists={visibleLists}/>
            </Container>  
      </div>       
    );   
}
  
export default ShoppingListPage;

