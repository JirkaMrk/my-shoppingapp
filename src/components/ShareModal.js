import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ShareModal = (props) => {

  const [sharedUsers, setSharedUsers] = useState([]);

  useEffect(() => {
    // Update sharedUsers when props.shareList changes
    setSharedUsers(props.shareList || []);
  }, [props.shareList]);

  const handleCheckboxChange = (userId) => {
    setSharedUsers((prevUsers) => {
      return prevUsers.map((user) => {
        if (user.userId === userId) {
          return { ...user, onShare: !user.onShare };
        }
        return user;
      });
    });
  };

  const handleUserFilter = (userId) => {
    const isOwner = props.logInUser === props.listOwner;
    return isOwner ? userId === props.listOwner : userId !== props.logInUser;
  };

  return (
    <Modal show={props.show} onHide={props.handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>List of shared users</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <ListGroup>
            {sharedUsers.map((item) => (
              <Row className="align-items-center" key={item.userId}>
                <Col sm={4} className="my-1">
                  <Form.Check
                    id={`checkbox-${item.userId}`}
                    type="checkbox"
                    name="onShare"
                    label= {item.onShare ? "Shared" : "Not shared"}
                    checked={item.onShare}
                    onChange={() => handleCheckboxChange(item.userId)}
                    disabled={handleUserFilter(item.userId)}
                  />
                </Col>
                <Col sm={4} className="my-1">
                  <Form.Control
                    type="text"
                    id={`userName-${item.userId}`}
                    name="userName"
                    defaultValue={item.userName}
                    disabled
                    autoComplete="off"
                  />
                </Col>
                <Col sm={4} className="my-1">
                  <Form.Control
                    type="text"
                    id={`userId-${item.userId}`}
                    name="userId"
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