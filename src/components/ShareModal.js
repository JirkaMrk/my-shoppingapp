import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';

const ShareModal = (props) => {
  const [sharedUsers, setSharedUsers] = useState(props.sharedUsers);

  const handleCheckboxChange = (userId) => {
    const updatedUsers = sharedUsers.map((user) => {
      if (user.userId === userId) {
        return { ...user, onShare: !user.onShare };
      }
      return user;
    });
    setSharedUsers(updatedUsers);
  };

  console.log(sharedUsers);

  return (
    <Modal show={props.show} onHide={props.handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>List of shared users</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <ListGroup>
            {sharedUsers.map((item) => (
              <Row className="align-items-center" key={item.userId} >
                <Col sm={2} className="my-1">
                    <Form.Check
                        id={item.userId}
                        type='checkbox'
                        name='onShare'
                        label="Share"
                        checked={item.onShare}
                        onChange={() => handleCheckboxChange(item.userId)}
                      
                    />     
                </Col>
                <Col sm={8} className="my-1">
                <Form.Control
                  type='text'
                  id='userName'
                  name='userName'
                  defaultValue={item.userName}
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