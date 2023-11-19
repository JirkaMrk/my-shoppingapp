import { Modal, Button } from "react-bootstrap";

const ConfirmationDialog = (props) => {  // komponenta pro dialogové okno potvrzení

  return (
    <Modal show={props.show} onHide={props.handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title><h1>{props.title}</h1></Modal.Title>
      </Modal.Header>
      <Modal.Body><h4>{props.body}</h4></Modal.Body>
      <Modal.Footer>
        <Button onClick={props.handleClose} variant="secondary">
          Cancel
        </Button>
        <Button onClick={props.onConfirm} variant="danger">
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationDialog;