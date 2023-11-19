import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import UniqueIdGenerator from "./UniqueIdGenerator";

const NewListModal = (props) => {

    const uniqueIdGenerator = UniqueIdGenerator();
    const [newId, setNewId] = useState(uniqueIdGenerator.generateUniqueId());

    const handleButtonClick = () => {   // funkce nastaví nový "_id" pro nový seznam
        setNewId(uniqueIdGenerator.generateUniqueId());
        };
    
        const [newFormData, setNewFormData] = useState({  // stavy pro nový seznam
            name: "",
            note: "",
            activeList: true,
            ownerId: props.logInUser,
            userId: [],
            listOfItems: [],
            _id: "",
        });
    
        useEffect(() => {  
            // funkce nastaví "newFormData" s novým "_id" a "ownerId"
            setNewFormData((prevState) => ({
                ...prevState,
                ownerId: props.logInUser,
                _id: newId,   
            }));
        }, [newId]);    

    const handleInputChange = (e) => {  
        // funkce nastaví "newFormData" s novými hodnotami
        setNewFormData({
            ...newFormData,
            [e.target.name]: e.target.value.trim(),
        });
    };

    const handleCreateList = () => { 
        // funkce přidá nový seznam do seznamu "dataList" a zavře dialogové okno
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
    );
};

export default NewListModal;