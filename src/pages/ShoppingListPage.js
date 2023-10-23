import 'bootstrap/dist/css/bootstrap.min.css';
import { Container} from 'react-bootstrap';
import ShoppingCards from '../components/Cards';
import data from "../data/data.json";
import { Card } from "react-bootstrap";
import { Form } from 'react-bootstrap';


function ShoppingListPage() {
   
    return (
   
      <div className="text-center">
        <Form.Select size="sm" aria-label="Default select example">
      <option>Filtr: Moje nákupní seznamy</option>
      <option value="1">Všechny seznamy</option>
      <option value="2">Moje seznamy</option>
      <option value="3">Sdílené seznamy</option>
      <option value="4">Uzavřené seznamy</option>
    </Form.Select>
      <Form.Select size="sm"  aria-label="Default select example">
      <option>Uživatelé</option>
      <option value="1">Jirka</option>
      <option value="2">Tom</option>
      <option value="3">Martin</option>
    </Form.Select>

            <Container className='mt-4'>
              <ShoppingCards/>
            </Container>  
      </div>       
    );
      

}
  
export default ShoppingListPage;

