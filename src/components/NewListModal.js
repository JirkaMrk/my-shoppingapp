import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';

const NewListModal = (props) => {
    const [newFormData, setNewFormData] = useState({
        name: "",
        note: "",
        activeList: true,
        ownerId: props.logInUser,
        userId: [],
        listOfItems: [],
        _id: "",
    });

    useEffect(() => {
        const newId = uniqueIdGenerator();
        setNewFormData((prevState) => ({
            ...prevState,
            _id: newId,
            ownerId: props.logInUser,
        }));
    }, [props.logInUser]); 

    const uniqueIdGenerator = () => {
        return uuidv4();
    }

    const handleInputChange = (e) => {
        setNewFormData({
            ...newFormData,
            [e.target.name]: e.target.value.trim(),
        });
    };

    const handleCreateList = () => {
        props.onSubmit(newFormData);
        props.handleClose();
    };

    return (
        <Modal show={props.show} onHide={props.handleClose} backdrop="static"> 
            <Modal.Header closeButton>
                <Modal.Title>New shopping List</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>List name</Form.Label>
                        <Form.Control
                            id="listName"
                            type="text"
                            name="name"
                            placeholder="Název nákupního seznamu"
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleCreateList} 
                variant="success"
                disabled={newFormData.name === "" ? true : false}
                > 
                    Create new shopping list
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default NewListModal;