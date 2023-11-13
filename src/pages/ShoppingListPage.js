import { Button, Container, Modal} from 'react-bootstrap';
import ShoppingCards from '../components/Cards';
import { useState } from 'react';
import ShoppingListGrid from '../components/ShoppingListGrid';
import ShoppingListForm from '../components/ShoppingListForm';


function ShoppingListPage( {logInUser, visibleLists} ) {

      const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);
   
    return (  
      <div>
          <Container className='mt-4'>
              <div className='text-center'>
                <Button 
                variant="outline-dark" 
                size="lg" className='mb-4' 
                onClick={setShow}>
                  Add new shopping list
                  </Button>
                </div>  
                <Modal size="xl" show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>TODO</Modal.Title>
                    <Modal.Body>
                      <ShoppingListForm/>
                      </Modal.Body>
                    </Modal.Header>
                  </Modal>
              <ShoppingCards logInUser={logInUser} visibleLists={visibleLists}/>
            </Container>  
      </div>       
    );
      

}
  
export default ShoppingListPage;

