import { Container} from 'react-bootstrap';
import ShoppingCards from '../components/Cards';

function ShoppingListPage() {
   
    return (
      <div>
          <Container className='mt-4'>
              <ShoppingCards/>
            </Container>  
      </div>       
    );
      

}
  
export default ShoppingListPage;

