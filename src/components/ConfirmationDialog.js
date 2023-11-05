import { Modal, Button } from "react-bootstrap";

const ConfirmationDialog = (props) => {
    return (
        <Modal show={props} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.handleClose} variant='secondary'>Cancel</Button>
                <Button onClick={props.onConfirm} variant='primary'>Confirm</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmationDialog;