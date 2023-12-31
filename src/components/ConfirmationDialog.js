import { Modal, Button } from "react-bootstrap";

const ConfirmationDialog = (props) => {  // komponenta pro dialogové okno potvrzení

  const isEnglish= props.isEnglish

  const translations = {
    cancel: {
      en: 'Cancel',
      cs: 'Zrušit',
    },
    confirm: {
      en: 'Confirm',
      cs: 'Potvrdit',
    },
  };

  return (
    <Modal show={props.show} onHide={props.handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title><h1>{props.title}</h1></Modal.Title>
      </Modal.Header>
      <Modal.Body><h4>{props.body}</h4></Modal.Body>
      <Modal.Footer>
        <Button onClick={props.handleClose} variant="secondary">
        {`${translations.cancel[isEnglish ? 'en' : 'cs']}`}
        </Button>
        <Button onClick={props.onConfirm} variant="danger">
        {`${translations.confirm[isEnglish ? 'en' : 'cs']}`}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationDialog;