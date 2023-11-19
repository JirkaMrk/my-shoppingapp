import React from "react";
import { useState, useEffect } from "react";
import ShoppingListGrid from "./ShoppingListGrid";
import { Button, Form, Col, Row } from "react-bootstrap";
import AddBook from "./Add-Item";
import ShareModal from "./ShareModal";
import allUsersList from "../data/allUsersList.json";
import data from "../data/data.json";
import { useParams } from "react-router-dom";
import UniqueIdGenerator from "./UniqueIdGenerator";


function ShoppingListForm( props ) {  // komponenta pro zobrazení formuláře seznamu

  function uniqueIdGenerator() { // funkce pro generování unikátního ID
    return UniqueIdGenerator().generateUniqueId();
  }

  const { displayListId } = useParams();

  const blank = {
    name: "",
    note: "",
    activeList: true,
    ownerId: props.logInUser,
    userId: [],
    listOfItems: [],
    _id: uniqueIdGenerator(),
  };

  const [shoppingListData, setShoppingListData] = useState([blank]);
  const ownerId = shoppingListData[0]?.ownerId;

  useEffect(() => {
    // Update shoppingListData if displayListId changes
    const newList = data.filter((list) => list._id === displayListId);
  
    if (Array.isArray(newList) && newList.length > 0) {
      // Push data to setShoppingListData
      const shoppingListItems = newList.reduce((items, shoppingList) => {
        return items.concat(
          shoppingList.listOfItems.map((item) => ({
            id: item.id,
            done: item.done,
            listItem: item.listItem,
            amount: item.amount,
            units: item.units,
          }))
        );
      }, []);
  
      setShoppingList(shoppingListItems);
    } else {
      // If newList is not an array or is empty, set an empty array to shoppingList
      setShoppingList([]);
    }
  
    setShoppingListData(newList);
  }, [displayListId]);

  const listOfUsers = []; 
  shoppingListData.forEach((userList) => { // projde všechny seznamy 
  userList.userId.forEach((item) => {
    const itemInfo = {  // vytvoří seznam uživatelů ze seznamu v ShoppingListExample
      userId: item.userId,
    };
    listOfUsers.push(itemInfo); // přidá položky do seznamu 
  });
  });



  const [list, setList] = useState([]); 
  const [shoppingList, setShoppingList] = useState([]);
  const [showChecked, setShowChecked] = useState(false); 
  const [show, setShow] = useState(false);
  const [users, setUsers] = useState(listOfUsers);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const usersListToShare = allUsersList.map((user) => {  
  // vytvoří seznam všech uživatelů a přiřadí uživateli informace o sdílení tohoto seznamu
  // ze seznamu uživatelů v ShoppingListExample
  const isShared = shoppingListData.some((list) =>  
    list.userId.some((item) => item.userId === user.userId) 
  );
  return {  
    onShare: isShared,
    userId: user.userId,
    userName: user.userName
  };
  });

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
            list.push({ ...data, id: uniqueIdGenerator() });
          return list;
        });
    }

    function handleToggleShowChecked() {  // funkce pro zobrazení/ skrytí všech položek
         setShowChecked(!showChecked )  
    };

    return (
        <div>   
            <Form> 
                <Col sm={14} className="my-1"> 
                <Form.Control 
                   type="text" 
                   name="name" 
                   defaultValue={shoppingListData[0]?.name} 
                   placeholder="Název nákupního seznamu" 
                   disabled={ownerId !== props.logInUser ? true : false}
                />
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
                      {showChecked ? "Show active items" : "Show all items"}
                    </Button>
            
                    <Button  // todo
                     variant="success" type="submit" disabled>
                       Save list
                    </Button>
            
                    <Button variant="warning" onClick={handleShow}>  
                         Share List 
                    </Button>  
                       
                    <ShareModal 
                      shareList={usersListToShare}
                      show={show}
                      listOwner={shoppingListData[0]?.ownerId}
                      logInUser={props.logInUser}
                      handleClose={handleClose}
                      handleShow={handleShow}
                        />
                    
                    <Button 
                     variant="danger" disabled>
                     Delete List
                    </Button>
                </Row>
                
            </Col>
        </div>    
    );
}

export default ShoppingListForm;
