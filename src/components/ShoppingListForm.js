import React from "react";
import { useState } from "react";
import Book from "./book";
import { Button, Modal, Form, Row } from "react-bootstrap";


const VYCHOZI_KNIHA = [ // výchozí data


    {id: "0", done:"1", name: "knih0", author: "Jirka", year: "2023"},
    {id: "1", done:"0", name: "kn1", author: "Jirka", year: "2023"},
    {id: "2", done:"1", name: "knha2", author: "Tom", year: "2020"},
    {id: "3", done:"0",name: "knih3", author: "Jirka", year: "2023"},
    {id: "4", done:"1", name: "niha4", author: "Tom", year: "2020"}             
];

function ShoppingListForm(props) {
    const [ modalOpen, setModalOpen ] = useState(false); // výchozí data zavření modálního okna
    const [vychoziKniha, setVychoziKniha] = useState(VYCHOZI_KNIHA);    // výchozí data  
    const [showChecked, setShowChecked] = useState(true); // výchozí data zobrazení zaškrtnutých položek
    
    
    function handleDelete(id) { // funkce pro smazání položky
        setVychoziKniha(([...momentlaniList]) => {  // vytvoří nový seznam, který obsahuje všechny položky z původního seznamu
            const index = momentlaniList.findIndex((item) => item.id === id);   // najde index položky, kterou chceme smazat  
            momentlaniList.splice(index, 1);    // smaže položku ze seznamu 
            return momentlaniList;  // vrátí nový seznam
        })
    };
/*
    const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
    */

    function handleToggleShowChecked() { {
        setShowChecked(!showChecked);
    };
  };

    return (
        <div>
            <h1>
                Můj shopping list
            </h1>  
            {vychoziKniha
                    .filter((item) => showChecked || item.done === "0")
                    .map((item) => (
                        <Book key={item.id} {...item} onDelete={() => handleDelete(item.id)} />
                    ))} 
            <Button variant="primary" onClick= {() => setModalOpen(true)}>
                +
            </Button>
            
                <Button variant="primary" onClick={handleToggleShowChecked}>
                    {showChecked ? "Hide checked" : "Show checked"}
                </Button>
               
         
        </div>
        
    );

}

export default ShoppingListForm;

 // {vychoziKniha.map((item) =>(        
 //           <Book key= {item.id} {...item} onDelete={(id) => handleDelete(item.id)}/>            
  //          ))}
  //          */


