import { Button, Container, Modal} from 'react-bootstrap';
import ShoppingCards from '../components/Cards';
import { useState } from 'react';
import NewListModal from '../components/NewListModal';
import data from "../data/data.json";

function ShoppingListPage( {logInUser, visibleLists} ) {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleNewListSubmit = (formData) => {
    data.push(formData);
  };

  console.log("data",data);

    return (  
      <div>
          <Container className='mt-4'>
              <div className='text-center'>
                <Button 
                variant="outline-dark" 
                size="lg" 
                className='mb-4' 
                onClick={handleShow}>
                  Add new shopping list
                  </Button>
                </div>     
                <NewListModal 
                logInUser={logInUser}
                show={show}
                handleClose={handleClose}
                handleShow={handleShow}
                onSubmit={handleNewListSubmit}
                />
              <ShoppingCards data={data} logInUser={logInUser} visibleLists={visibleLists}/>
            </Container>  
      </div>       
    );
      

}
  
export default ShoppingListPage;

