import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import { Form, FormGroup } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';



function ShoppingListPage() {

    const [show, setShow] = useState (false);
   
    return (
        <>
         <div class="text-center">
           <Button className='w-20' variant='outline-success' onClick={() => setShow(true)}>
             New shopping list
            </Button>
          </div>

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
                    <FormGroup
                        label='Recipe name'
                        type='text'
                        placeholder='Recipe name'
                        validate={true}
                    />
                    <FormGroup
                        label='Description'
                        as='textarea'
                        placeholder='Description'
                        rows={5}
                        validate={true}
                    />
                    <FormGroup
                        label='Image URL'
                        type='url'
                        placeholder='Image URL'
                        validate={true}
                    />
                            
                    <div className="mt-3">
                        <Row className='gx-1'>
                            <Col className='ps-0' xs={7}>
                                <FormGroup
                                    label='Preparation length (minutes)'
                                    type='number'
                                    placeholder='Preparation length in minutes'
                                    validate={true}
                                />
                            </Col>
                            <Col className xs={5}>
                                <FormGroup
                                    label='Final amount (servings)'
                                    type='number'
                                    placeholder='Final amount in servings'
                                    validate={true}
                                />
                            </Col>
                        </Row>
                    </div>
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
        </>
      );
    }

export default ShoppingListPage;
