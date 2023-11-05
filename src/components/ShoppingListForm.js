import React from "react";
import { useState } from "react";
import ShoppingListGrid from "./ShoppingListGrid";
import { Button, Form, Col, Row } from "react-bootstrap";
import AddBook from "./Add-Item";
import ShareModal from "./ShareModal";



const ShoppingListDefox = [ 
    {
      "name": "Jirkův Lídl",
      "note": "Kup rychle,vykoupí!",
      "ownerId": 1045,
      "userId": [
            {name: "Jirka", id: 1045},
            {name: "Petr", id: 1046},
            {name: "Karel", id: 1047},
            {name: "Jana", id: 2046},
            {name: "Marie", id: 4096}
            ],
    "listOfItems": [
        {
            id: "0",
            done: true,
            listItem: "Mrkev",
            amount: "20",
            units: "kgs"
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
        },
        {
            id: "5",
            done: true,
            listItem: "Víno",
            amount: "1",
            units: "láhev"
        }  

    ]
    }             
];

const ShoppingListItems = []; // vytvoří prázdný seznam položek listu

ShoppingListDefox.forEach((shoppingList) => { // projde všechny seznamy v ShoppingListDefox
  shoppingList.listOfItems.forEach((item) => {
    const itemInfo = {  // vytvoří seznam položek
      
      id: item.id,
      done: item.done,
      listItem: item.listItem,
      amount: item.amount,
      units: item.units,
      
    };
    ShoppingListItems.push(itemInfo); // přidá položky do seznamu
  });
});

console.log(ShoppingListItems);

const listOfUsers = []; // vytvoří prázdný seznam uživatelů

ShoppingListDefox.forEach((userList) => { // projde všechny seznamy 
  userList.userId.forEach((item) => {
    const itemInfo = {  // vytvoří seznam položek
      id: item.id,
      name: item.name,
    };
    listOfUsers.push(itemInfo); // přidá položky do seznamu 
  });
});

console.log(listOfUsers);

function ShoppingListForm(props) {
   
    const [list, setList] = useState([]); 
    const [shoppingList, setShoppingList] = useState(ShoppingListItems);  
    const [showChecked, setShowChecked] = useState(true); 
    const [show, setShow] = useState(false);
    const [users, setUsers] = useState(listOfUsers);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
            <Form>  
                <Col sm={14} className="my-1">
                    <Form.Control 
                     type="text" 
                     name="name" 
                     defaultValue={ShoppingListDefox[0].name} 
                     placeholder="Název nákupního seznamu" 
                     disabled={ShoppingListItems[0].ownwrID !== 1045 ? true : false}/>
                </Col>

            </Form>

            {shoppingList
             .filter((item) => showChecked || item.done === false )
             .map((item) => (
                <ShoppingListGrid key={item.id} {...item} onDelete={() => handleDelete(item.id)} 
                />
            ))}

            <AddBook key={list.length} onAdd={addBook} />

            <Col sm={11} className="my-1 offset-sm-1 offset-md-1">
                <Row sm={5}>
                    <Button 
                       variant="primary" onClick={handleToggleShowChecked}>
                      {showChecked ? "Show active" : "Show all"}
                    </Button>
            
                    <Button 
                     variant="success" type="submit">
                       Save list
                    </Button>
            
                    <Button 
                      variant="warning" onClick={handleShow} >
                       Share List
                    </Button>
                     {show && <ShareModal handleClose={handleClose} />}
            
                    <Button 
                     variant="danger"  >
                     Delete List
                    </Button>
                </Row>
            </Col>
        </div>    
    );
}

export default ShoppingListForm;

/*
{users.map((item) => (
                <ShareModal key={item.id} {...item} />
            ))}
            */
