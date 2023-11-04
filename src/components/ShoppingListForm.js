import React from "react";
import { useState } from "react";
import ShoppingListGrid from "./ShoppingListGrid";
import { Button, Modal, Form, Row } from "react-bootstrap";
import AddBook from "./Add-Item";


const ShoppingListDef = [ 
    {
      "name": "Jirkův Lídl",
      "note": "Kup rychle,vykoupí!",
      "ownerID": 1045,
      "userID": [
          1046,
          1047,
          2046,
          4096
          ], 

    "listOfItems": [
        {
            id: "0",
            done: true,
            listItem: "Mrkev",
            amount: "20",
            units: "kg"
        },
        {
            id: "1",
            done: false,
            listItem: "Mléko",
            amount: "10",
            units: "l"
        },
        {
            id: "2",
            done: true,
            listItem: "Rohlíky",
            amount: "50",
            units: "kus"
        },
        {
            id: "3",
            done: true,
            listItem: "Sůl",
            amount: "3",
            units: "špetky"
        },
        {
            id: "4",
            done: false,
            listItem: "Pivo",
            amount: "10",
            units: "plechovek"
        } 
    ]
    }             
];

function ShoppingListForm(props) {
    
    const [list, setList] = useState([]); 
    const [shoppingList, setShoppingList] = useState(ShoppingListDef);  
    const [showChecked, setShowChecked] = useState(true); 
    const [show, setShow] = useState(false);

    function _uniqueId() { // funkce pro generování unikátního ID
        return Math.random().toString(36);
    }

    function handleDelete(id) { // funkce pro smazání položky
        setShoppingList(([...list]) => {  // vytvoří nový seznam, který obsahuje všechny položky z původního seznamu
            const index = list.findIndex((item) => item.id === id);   // najde index položky, kterou chceme smazat  
            list.splice(index, 1);    // smaže položku ze seznamu 
            return list;  // vrátí nový seznam
        })
    };

    function addBook(data) {
        // save new data
        setShoppingList(([...list]) => {
            list.push({ ...data, id: _uniqueId() });
          return list;
        });
      }
    
      function handleSubmit(e) {
        const data = e.data.value;
        addBook(data);
      }

    function handleToggleShowChecked() { {
        setShowChecked(!showChecked );
    };
  };

    return (
        <div>
            <h1>
                Můj shopping list
            </h1>  
            {shoppingList
                .filter((item) => showChecked || item.done === false )
                .map((item) => (
                    <ShoppingListGrid key={item.id} {...item} onDelete={() => handleDelete(item.id)} />      
            ))}
            <AddBook key={list.length} onAdd={addBook} />

            <div className="d-flex justify-content-center">
            <Button 
                variant="primary" onClick={handleToggleShowChecked}>
                {showChecked ? "Show active" : "Show all"}
            </Button>
            <Button 
              variant="success" type="submit" onClick={handleSubmit}>
                Save list
            </Button>
            <Button 
              variant="warning"  onClick={handleSubmit}>
                Share list
            </Button>
            </div>
        </div>
        
    );

}

export default ShoppingListForm;




