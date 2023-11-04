import { useState } from "react";
import { Form, FormControl, Button, Col, Row, ListGroup } from "react-bootstrap";

function AddBook(props) {
  const [name, setName] = useState();
  const [author, setAuthor] = useState();
  const [year, setYear] = useState();
  const [done, setDone] = useState(false);

  return (
    <Form>
        <ListGroup> 
            <Row className="align-items-center">
                  <div className="d-flex justify-content-center">
                     <Button variant="outline-success"  onClick={() => props.onAdd({name, author, year})}>
                          Add new item
                     </Button>
                  </div>
                <Col sm={7} className="my-1">
                    <FormControl
                        id='name'
                        type='text'
                        name='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                    />
                </Col>
                <Col sm={2} className="my-1">
                    <FormControl
                        id='author'
                        type='text'
                        name='author'
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="Author"
                    />
                </Col>
                <Col sm={2} className="my-1">
                    <FormControl
                        id='year'
                        type='text'
                        name='year'
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        placeholder="year"

                    />
                </Col>
                
            </Row>
        </ListGroup> 
</Form>
     
  );
}

export default AddBook;

