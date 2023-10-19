import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Modal } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import ShoppingCards from '../components/Cards';
import data from "../data/data.json";
import { Card } from "react-bootstrap";



function ShoppingListPage() {
    const [show, setShow] = useState (false);
   
    return (

      <div className="text-center">
           <Button className='w-20' variant="warning" onClick={() => setShow(true)}>
             New shopping list
            </Button>

            <Modal
            size="xl"
            fullscreen="lg-down"
            show={show}
            onHide={() => setShow(false)}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
            backdrop="static"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-custom-modal-styling-title">
                Shopping list
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={2}>
          Email
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="email" placeholder="Email" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
        <Form.Label column sm={2}>
          Password
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="password" placeholder="Password" />
        </Col>
      </Form.Group>
      <fieldset>
        <Form.Group as={Row} className="mb-3">
          <Form.Label as="legend" column sm={2}>
            Radios
          </Form.Label>
          <Col sm={10}>
            <Form.Check
              type="radio"
              label="first radio"
              name="formHorizontalRadios"
              id="formHorizontalRadios1"
            />
            <Form.Check
              type="radio"
              label="second radio"
              name="formHorizontalRadios"
              id="formHorizontalRadios2"
            />
            <Form.Check
              type="radio"
              label="third radio"
              name="formHorizontalRadios"
              id="formHorizontalRadios3"
            />
          </Col>
        </Form.Group>
      </fieldset>
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalCheck">
        <Col sm={{ span: 10, offset: 2 }}>
          <Form.Check label="Remember me" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Col sm={{ span: 10, offset: 2 }}>
          <Button type="submit">Sign in</Button>
        </Col>
      </Form.Group>
    </Form>
                    <Button className='mt-4'
                     variant={"danger"}
                     type="submit"
                    >
                      Delete shopping list</Button>

                    <Button className='mt-4 center'
                        variant={"success"}
                        type="submit"
                    >
                        Share shopping list
                    </Button>

                    <Button className='mt-4 float-end'
                        variant={"success"}
                        type="submit"
                    >
                        Save shopping list
                    </Button>
            </Modal.Body>
          </Modal>
          
            <Container className='mt-4'>
              <ShoppingCards/>
            </Container>  
      </div>       
    );
      

}
  
export default ShoppingListPage;

