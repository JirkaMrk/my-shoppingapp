import React from 'react';
import { Modal, Button } from 'react-bootstrap';

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
        <p>Modal body text goes here.</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>Close</Button>
        <Button variant="primary">Save changes</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ShareModal;
