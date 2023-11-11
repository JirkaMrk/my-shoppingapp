import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';

const ShareModal = (props) => {  // modální okno pro sdílení seznamu

  const [sharedUsers, setSharedUsers] = useState(props.sharedUsers); // seznam sdílených uživatelů

  const handleCheckboxChange = (userId) => {  // změna stavu sdílení uživatelů
    const updatedUsers = sharedUsers.map((user) => {
      if (user.userId === userId) {
        return { ...user, onShare: !user.onShare };
      }
      return user;
    });
    setSharedUsers(updatedUsers);
  };

  const handleUserFilter = (userId) => {  // logika pro "disabled" checkboxu na základě přihlášeného uživatele
    const isOwner = props.logInUser === props.listOwner;
    return isOwner ? userId === props.listOwner : userId !== props.logInUser;
  };

  return (  // výpis sdílených uživatelů s disabled checkboxem dle uživatele/ vlastníka seznamu
    <Modal show={props.show} onHide={props.handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>List of shared users</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <ListGroup>
            {sharedUsers.map((item) => (  // výpis sdílených uživatelů 
              <Row className="align-items-center" key={item.userId}>
                <Col sm={4} className="my-1">
                  <Form.Check
                    id={`checkbox-${item.userId}`} // Use a unique id here
                    type='checkbox'
                    name='onShare'
                    label="Share"
                    checked={item.onShare}
                    onChange={() => handleCheckboxChange(item.userId)}  // změna stavu sdílení uživatelů
                    disabled={handleUserFilter(item.userId)}  // logika pro "disabled" checkboxu na základě přihlášeného uživatele
                  />
                </Col>
                <Col sm={4} className="my-1">
                  <Form.Control
                    type='text'
                    id={`userName-${item.userId}`} // Nutnost unikátního Id
                    name='userName'
                    defaultValue={item.userName}
                    disabled
                    autoComplete="off" // vypne automatické doplňování prohlížeče
                  />
                </Col>
                <Col sm={4} className="my-1">
                  <Form.Control
                    type='text'
                    id={`userId-${item.userId}`} // Nutnost unikátního Id
                    name='userId'
                    defaultValue={item.userId}
                    disabled
                    autoComplete="off"
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