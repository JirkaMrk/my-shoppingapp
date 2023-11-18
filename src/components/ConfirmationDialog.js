import { Modal, Button } from "react-bootstrap";

const ConfirmationDialog = (props) => {
    console.log(props);
  return (
    <Modal show={props.show} onHide={props.handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title><h2>{props.title}</h2></Modal.Title>
      </Modal.Header>
      <Modal.Body><h3>{props.body}</h3></Modal.Body>
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