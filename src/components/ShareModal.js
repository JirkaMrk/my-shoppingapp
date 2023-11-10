import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ShareModal = (props) => {

  return (
    <Modal show={props.show} onHide={props.handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>List of shared users</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <ListGroup>
            {props.sharedUsers.map((user) => (
              <Row className="align-items-center" key={user.userId}>
                <Col sm={4} className="my-1">
                    <Form.Check
                        id='onShare'
                        type='checkbox'
                        name='onShare'
                        label="Share"
                        defaultChecked={user.onShare === true ? true : false}
                        onChange={user.onCheck}
                      
                    />     
                </Col>
                <Col sm={6} className="my-1">
                <Form.Control
                  type='text'
                  id='userName'
                  name='userName'
                  defaultValue={user.userName}
                  disabled
                />
                </Col>
              </Row>
            ))}
          </ListGroup>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        <Button variant="primary">Save changes</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ShareModal;