import 'bootstrap/dist/css/bootstrap.min.css';
import { Container} from 'react-bootstrap';
import ShoppingCards from '../components/Cards';
import data from "../data/data.json";
import { Card } from "react-bootstrap";
import { Form } from 'react-bootstrap';


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

