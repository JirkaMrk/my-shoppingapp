import React from "react";
import { useState } from "react";
import Book from "./book";
import { Button, Modal, Form, Row } from "react-bootstrap";


const VYCHOZI_KNIHA = [ // výchozí data
    {id: "1", name: "kniha1", autor: "Jirka", rok: "2023"},
    {id: "2", name: "kniha2", autor: "Tom", rok: "2020"},
    {id: "3", name: "kniha3", autor: "Jirka", rok: "2023"},
    {id: "4", name: "kniha4", autor: "Tom", rok: "2020"}             
];

function ShoppingListForm(props) {
    const [ modalOpen, setModalOpen ] = useState(false); // výchozí data zavření modálního okna
    const [vychoziKniha, setVychoziKniha] = useState(VYCHOZI_KNIHA);    // výchozí data  
    
    function handleDelete(id) { // funkce pro smazání položky
        setVychoziKniha(([...momentlaniList]) => {  // vytvoří nový seznam, který obsahuje všechny položky z původního seznamu
            const index = momentlaniList.findIndex((item) => item.id === id);   // najde index položky, kterou chceme smazat  
            momentlaniList.splice(index, 1);    // smaže položku ze seznamu 
            return momentlaniList;  // vrátí nový seznam
        })
    };

    
    const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
  };



    return (
        <div>
            <h1>
                Knihovna
            </h1>   
            <Button variant="primary" onClick= {() => setModalOpen(true)}>
                +
            </Button>

            <Modal key={modalOpen} onSubmit={handleSubmit} show={modalOpen} onHide={() => setModalOpen(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Přidat knihu
                    </Modal.Title> 
                    <Modal.Body >
                        <Form>
                           <Form.Control
                                name= "name"
                                label= "name"
                    
                                />
                           <Form.Control
                                name= "autor"
                                label= "autor"
      
                                />
                        </Form>
                        </Modal.Body>  
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setModalOpen(false)}>
                                Zrušit
                            </Button>
                            <Button variant="primary" type="submit" onClick={handleSubmit}>
                                Uložit
                            </Button> 
                        </Modal.Footer>
                </Modal.Header>             
                </Modal>
            
            {vychoziKniha.map((item) =>(        
                <Book key= {item.id} {...item} onDelete={(id) => handleDelete(item.id)}/>            
            ))}
         
        </div>
        
    );

}

export default ShoppingListForm;