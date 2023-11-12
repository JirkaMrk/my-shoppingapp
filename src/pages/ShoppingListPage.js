import { Container} from 'react-bootstrap';
import ShoppingCards from '../components/Cards';


function ShoppingListPage( {logInUser, visibleLists} ) {
   
    return (
      <div>
          <Container className='mt-4'>
              <ShoppingCards logInUser={logInUser} visibleLists={visibleLists}/>
            </Container>  
      </div>       
    );
      

}
  
export default ShoppingListPage;

