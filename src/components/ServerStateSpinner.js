import {Modal, Button, Spinner} from "react-bootstrap";

const CallStateModal = (props) => {
    const error = props.error || "Server not responding";
    const isEnglish = props.isEnglish;

    const translations = {
        contactingServer: {
          en: 'Contacting server',
          cs: 'Kontaktuji server',
        },
        close: {
          en: 'Close',
          cs: 'Zavřít',
        },
        done: {
          en: 'Done',
          cs: 'Hotovo',
        },
    };

    function serverResponseState() {
        switch (props.stateOfServer) {
            case "pending":
                return (
                    <Modal.Body className="text-center">
                        <h3>{`${translations.contactingServer[isEnglish ? 'en' : 'cs']}`}</h3>
                        <Spinner />
                    </Modal.Body>
                );
            case "success":
                return (
                    <>
                        <Modal.Body>
                            <h3 className="text-center text-success">
                            {`${translations.done[isEnglish ? 'en' : 'cs']}`}
                            </h3>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="success text-center btn-block" onClick={props.onSuccess}>
                             {`${translations.close[isEnglish ? 'en' : 'cs']}`}
                            </Button>
                        </Modal.Footer>
                    </>
                );
            case "error":
                return (
                    <>
                        <Modal.Body>
                            <div className="text-center text-danger">
                                <h3>{error}</h3>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger" onClick={props.onCancel}>
                                {`${translations.close[isEnglish ? 'en' : 'cs']}`}
                            </Button>
                        </Modal.Footer>
                    </>
                );
            default:
                return null;
        }
    }

    return (
        <Modal backdrop="static" show={props.show} onHide={props.onCancel}>
            {serverResponseState()}
        </Modal>
    );
}

export default CallStateModal;