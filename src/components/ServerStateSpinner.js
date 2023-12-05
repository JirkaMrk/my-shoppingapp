import {Modal, Button, Spinner} from "react-bootstrap";

const CallStateModal = (props) => {
    const error = props.error || "Server not responding";

    function serverResponseState() {
        switch (props.stateOfServer) {
            case "pending":
                return (
                    <Modal.Body className="text-center">
                        <h3>Contacting server</h3>
                        <Spinner />
                    </Modal.Body>
                );
            case "success":
                return (
                    <>
                        <Modal.Body>
                            <h3 className="text-center text-success">Done</h3>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="success text-center btn-block" onClick={props.onSuccess}>Close</Button>
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
                            <Button variant="danger" onClick={props.onCancel}>Close</Button>
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