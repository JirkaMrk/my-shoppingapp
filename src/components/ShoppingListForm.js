import React from "react";
import { useState } from "react";
import ShoppingListGrid from "./ShoppingListGrid";
import { Button, Form, Col, Row } from "react-bootstrap";
import AddBook from "./Add-Item";
import ShareModal from "./ShareModal";
import allUsersList from "../data/allUsersList.json";


const ShoppingListExample = [ // data jednoho seznamu
    {
      "name": "Jirkův Lídl",
      "note": "Kup rychle,vykoupí!",
      "activeList": true,
      "ownerId": 4586623265, 
      "userId": [  
            {userId: 1234567890},
            {userId: 1111111111},
            {userId: 3333333333},
            {userId: 5555555555},
            {userId: 7777777777},
            {userId: 5656565656}
            
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
        },  
        {
          id: "6",
          done: false,
          listItem: "Pepsi",
          amount: "1",
          units: "litr"
        },  
        {
          id: "7",
          done: false,
          listItem: "Tatranka",
          amount: "10",
          units: "lks"
       }, 
       {
         id: "8",
         done: true,
         listItem: "Mouka",
         amount: "1",
         units: "kg"
        }  
    ]
    }             
];

const ownerId = ShoppingListExample[0].ownerId; 

const ShoppingListItems = []; 

ShoppingListExample.forEach((shoppingList) => { // projde všechny seznamy v ShoppingListDefox
  shoppingList.listOfItems.forEach((item) => {
    const itemInfo = {  // vytvoří pole seznamu všech položek seznamu z ShoppingListExample
      
      id: item.id,
      done: item.done,
      listItem: item.listItem,
      amount: item.amount,
      units: item.units,
      
    };
    ShoppingListItems.push(itemInfo); 
  });
});

const listOfUsers = []; 

ShoppingListExample.forEach((userList) => { // projde všechny seznamy 
  userList.userId.forEach((item) => {
    const itemInfo = {  // vytvoří seznam uživatelů ze seznamu v ShoppingListExample
      userId: item.userId,
    };
    listOfUsers.push(itemInfo); // přidá položky do seznamu 
  });
});

const usersListToShare = allUsersList.map((user) => {  
  // vytvoří seznam všech uživatelů a přiřadí uživateli informace o sdílení tohoto seznamu
  // ze seznamu uživatelů v ShoppingListExample
  const isShared = ShoppingListExample.some((list) =>  
    list.userId.some((item) => item.userId === user.userId) 
  );
  return {  
    onShare: isShared,
    userId: user.userId,
    userName: user.userName
  };
});

function ShoppingListForm( props ) {  // komponenta pro zobrazení formuláře seznamu
   
    const [list, setList] = useState([]); 
    const [shoppingList, setShoppingList] = useState(ShoppingListItems); 
    const [showOnShare, setShowOnShare] = useState(true);
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

    function handleCheck(id) {
        setShoppingList((prevList) => {
          return prevList.map((item) => {
            if (item.id === id) {
              // změna stavu položky seznamu (done)
              return { ...item, done: !item.done };
            }
            return item;
          });
        });
    };
 
    function addBook(data) {
        // přidá novou položku do seznamu
        setShoppingList(([...list]) => {
            list.push({ ...data, id: _uniqueId() });
          return list;
        });
    }

    function handleToggleShowChecked() {  // funkce pro zobrazení/ skrytí všech položek
         setShowChecked(!showChecked )  
    };

    function handleToggleShowOnShare() {  // funkce pro změnu stavu seznamu sdílení
      setShowOnShare(!showOnShare )  
    };

    return (
        <div>   
            <Form> 
                <Col sm={14} className="my-1"> 
                    <Form.Control 
                     type="text" 
                     name="name" 
                     defaultValue={ShoppingListExample[0].name} 
                     placeholder="Název nákupního seznamu" 
                     disabled={ownerId !== props.logInUser ? true : false}/>
                </Col>
            </Form>

            {shoppingList  // vyfiltruje vybrané položky a zobrazí je
             .filter((item) => showChecked || item.done === false  )
             .map((item) => (
                <ShoppingListGrid key={item.id} {...item} 
                onDelete={() => handleDelete(item.id)}  // provede smazání položky
                onCheck={() => handleCheck(item.id)}  // provede změnu stavu položky
                />
            ))}
        
            <AddBook key={list.length} onAdd={addBook} />  

            <Col sm={11} className="my-1 offset-sm-1 offset-md-1">
                <Row sm={5}>
                    <Button  // tlačítko pro zobrazení/ skrytí všech označených položek
                       variant="primary" onClick={handleToggleShowChecked}>
                      {showChecked ? "Show active" : "Show all"}
                    </Button>
            
                    <Button  // todo
                     variant="success" type="submit">
                       Save list
                    </Button>
            
                    <Button variant="warning" onClick={handleShow}>  
                         Share List 
                    </Button>  
                       
                    <ShareModal sharedUsers={usersListToShare}  // komponenta pro zobrazení modálního okna sdílení uživatelů
                    show={show}
                    listOwner={ShoppingListExample[0].ownerId}
                    logInUser={props.logInUser}
                    handleClose={handleClose}
                    handleShow={handleShow}
                    onCheck={() => handleToggleShowOnShare(usersListToShare.userId)}  
                    />
                    
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
