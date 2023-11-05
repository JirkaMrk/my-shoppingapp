import React from 'react';
import { Modal, Button, Form, Row, Col, ListGroup, FormControl } from 'react-bootstrap';

const ShareModal = (props) => {
  return (
    
    <Modal 
    show={props}
    onHide={props.handleClose}
    backdrop="static"
  >
      <Modal.Header closeButton onClick={props.handleClose}>
        <Modal.Title >Share shopping list</Modal.Title>
      </Modal.Header>

      <Modal.Body>
      <Form>
         <ListGroup id={props} > 
            <Row className="align-items-center">
                <Col sm={1} className="my-1">
                    <Form.Check
                        id='checkBox'
                        type='checkbox'
                        name='checkBox'
                        label="OK"
                        defaultChecked={true}
                    />     
                </Col>
                <Col sm={6} className="my-1">
                    <FormControl
                        id='listItem'
                        type='text'
                        name='listItem'
                        defaultValue={props.id}
                    />
                </Col>
            </Row>
          </ListGroup> 
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>Close</Button>
        <Button variant="primary">Save changes</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ShareModal;
