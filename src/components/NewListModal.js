import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import UniqueIdGenerator from "./UniqueIdGenerator";
import axios from 'axios';
import ServerStateSpinner from './ServerStateSpinner';

const NewListModal = (props, reloadData) => {

    const uniqueIdGenerator = UniqueIdGenerator();
    const [newId, setNewId] = useState(uniqueIdGenerator.generateUniqueId());

    const handleButtonClick = () => {
        setNewId(uniqueIdGenerator.generateUniqueId());
    };

    const [newFormData, setNewFormData] = useState({
        "name": "",
        "note": "",
        "activeList": true,
        "ownerId": props.logInUser,
        "userId": [],
        "listOfItems": [],
    });

    useEffect(() => {
        setNewFormData((prevState) => ({
            ...prevState,
            ownerId: props.logInUser,
        }));
    }, [newId, props.logInUser]);

    const [showAddCall, setShowAddCall] = useState(false);
    const [serverAddState, setServerAddState] = useState({ state: "pending" });

    const handleInputChange = (e) => {
        setNewFormData({
            ...newFormData,
            [e.target.name]: e.target.value.trim(),
        });
    };

    const handleCreateList = () => {
        // Show the spinner before making the API call
        setShowAddCall(true);

        axios.post('//localhost:3030/api/addList', newFormData)
            .then(response => {
                console.log("response data", response.data); // handle the response data
                setServerAddState({ state: "success" });
            })
            .catch(error => {
                console.error(error); // handle the error
                setServerAddState({ state: "error" });
            });

        props.handleClose();

        setNewFormData((prevState) => ({
            ...prevState,
            name: "",
        }));
    };

    return (
        <>
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
                    <Button
                        onClick={() => {
                            handleButtonClick();
                            handleCreateList();
                        }}
                        variant="success"
                        disabled={newFormData.name === "" ? true : false}
                    >
                        Create new shopping list
                    </Button>
                </Modal.Footer>
            </Modal>

            <ServerStateSpinner
                show={showAddCall}
                stateOfServer={serverAddState.state}
                onSuccess={() => {
                    setShowAddCall(false);
                    setServerAddState({ state: "pending" });   
                    props.reloadData();
                }}
                onCancel={() => {
                    setShowAddCall(false);
                    setServerAddState({ state: "pending" });

                }}
            />
        </>
    );
};

export default NewListModal;
