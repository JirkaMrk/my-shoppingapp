import React from "react";
import { useState, useEffect } from "react";
import ShoppingListGrid from "./ShoppingListGrid";
import { Button, Form, Col, Row } from "react-bootstrap";
import AddBook from "./Add-Item";
import ShareModal from "./ShareModal";
import allUsersList from "../data/allUsersList.json";
import { useParams } from "react-router-dom";
import UniqueIdGenerator from "./UniqueIdGenerator";
import axios from 'axios';
import ServerStateSpinner from './ServerStateSpinner'
import Chart from './PieChart';


function ShoppingListForm( props ) {  // komponenta pro zobrazení formuláře seznamu

  const { displayListId } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showGetCall, setShowGetCall] = useState(false);
  const [serverGetState, setServerGetState] = useState({ state: "pending" });
  const [showUpdateCall, setShowUpdateCall] = useState(false);
  const [serverUpdateState, setServerUpdateState] = useState({ state: "pending" });
  const isEnglish = props.isEnglish;

  const translations = {
    nameOfList: {
      en: 'Name of shopping list',
      cs: 'Název nákupního seznamu',
    },
    displayActiveLists: {
      en: 'Display active items',
      cs: 'Zobrazit aktivní položky',
    },
    displayAllLists: {
      en: 'Display all items',
      cs: 'Zobrazit všechny položky',
    },
    updateList: {
      en: 'Update list',
      cs: 'Aktualizovat seznam',
    },
    shareList: {
      en: 'Share list',
      cs: 'Sdílet seznam',
    },
    deleteList: {
      en: 'Delete list',
      cs: 'Smazat seznam',
    },

  };

  useEffect(() => {
    setShowGetCall(true);
    const fetchData = async () => {
      axios.get('//localhost:3030/api/getLists')
      .then(response => {
        // Handle the successful response
        setData(response.data);
        setServerGetState('success');
        setShowGetCall(false);
      })
      .catch(error => {
        // Handle errors
        setServerGetState('error');
        console.error('Error fetching data:', error);
      });
    };
  
    fetchData();
  }, []);

  function uniqueIdGenerator() { // funkce pro generování unikátního ID
    return UniqueIdGenerator().generateUniqueId();
  }

  const blank = { // prázdný seznam
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
    // Updatuje seznam položek, které se mají zobrazit
    const newList = data.filter((list) => list._id === displayListId);
  
    if (Array.isArray(newList) && newList.length > 0) {
      // vloží seznam položek do seznamu "shoppingList"
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
      // pokud není seznam položek nalezen, vynuluje seznam
      setShoppingList([]);
    }
  
    setShoppingListData(newList);
  }, [data, displayListId]);

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

    function handleListUpdate() {
      if (!displayListId) {
        console.error("Invalid displayListId");
        return;
      }
    
      const updatedShoppingListData = {
        "name": shoppingListData[0]?.name,
        "note": shoppingListData[0]?.note,
        "activeList": shoppingListData[0]?.activeList,
        "ownerId": shoppingListData[0]?.ownerId,
        "userId": shoppingListData[0]?.userId,
        "listOfItems": [],
        "_id": displayListId,
      };

      setShowUpdateCall(true);
      setServerUpdateState({ state: "pending" });
    
      axios
        .put(`//localhost:3030/api/updatelist/${displayListId}`, updatedShoppingListData)
        .then((response) => {
          const updatedList = response.data; // Assuming the updated data is returned from the server
          setData((prevList) => {
            const newList = prevList.map((item) =>
              item._id === displayListId ? updatedList : item
            );
            setServerUpdateState({ state: "success" });
            console.log("newList", newList);
            return newList;
          });
        })
        .catch((error) => {
          console.error('Error updating list:', error);
          setServerUpdateState({ state: 'error', error: error.message || 'Unknown error' });
        });
    }

    return (
        <div>   
            <Form> 
                <Col sm={14} className="my-1"> 
                <Form.Control
                    type="text"
                    name="name"
                    value={shoppingListData[0]?.name}  
                    onChange={(e) => {
    
                    setShoppingListData((prevData) => [{
                        ...prevData[0],
                        name: e.target.value,
                      }]);
                    }}
                    placeholder={`${translations.nameOfList[isEnglish ? 'en' : 'cs']}`}
                    disabled={ownerId !== props.logInUser ? true : false}
                  />
                </Col>
            </Form>

            {shoppingList  // vyfiltruje vybrané položky a zobrazí je
             .filter((item) => showChecked || item.done === false  )
             .map((item) => (
                <ShoppingListGrid key={item.id} {...item} 
                isEnglish={isEnglish}
                onDelete={() => handleDelete(item.id)}  // provede smazání položky
                onCheck={() => handleCheck(item.id)}  // provede změnu stavu položky
                />
            ))}
  
            <AddBook key={list.length} 
            isEnglish={isEnglish}
            onAdd={addBook} />  

            <Col sm={11} className="my-1 offset-sm-1 offset-md-1">
                <Row sm={5}>
                    <Button  // tlačítko pro zobrazení/ skrytí všech označených položek
                       variant="primary" onClick={handleToggleShowChecked}>
                      {showChecked ? (
                          `${translations.displayActiveLists[isEnglish ? 'en' : 'cs']}`
                        ) : (
                          `${translations.displayAllLists[isEnglish ? 'en' : 'cs']}`
                        )}
                    </Button>
            
                    <Button
                      variant="success"
                      type="submit"
                      onClick={() => {
                        handleListUpdate();
                      }}
                    >
                      {`${translations.updateList[isEnglish ? 'en' : 'cs']}`}
                    </Button>
            
                    <Button variant="warning" onClick={handleShow}>  
                      {`${translations.shareList[isEnglish ? 'en' : 'cs']}`}
                    </Button>  
                       
                    <ShareModal   // dialogové okno pro sdílení seznamu
                      shareList={usersListToShare}
                      show={show}
                      isEnglish={isEnglish}
                      listOwner={shoppingListData[0]?.ownerId}
                      logInUser={props.logInUser}
                      handleClose={handleClose}
                      handleShow={handleShow}
                        />
                    <Button 
                     variant="danger" disabled>
                     {`${translations.deleteList[isEnglish ? 'en' : 'cs']}`}
                    </Button>

                    <ServerStateSpinner // spinner pro načtení listu
                     show={showGetCall}
                     isEnglish={isEnglish}
                     stateOfServer={serverGetState.state}
                     onSuccess={() => {
                     setShowGetCall(false);
                     setServerGetState({ state: "pending" });
                    }}
                     onCancel={() => {
                     setShowGetCall(false);
                     setServerGetState({ state: "pending" });
                   }}
                   />    
                   <ServerStateSpinner // spinner pro update listu
                     show={showUpdateCall}
                     isEnglish={isEnglish}
                     stateOfServer={serverUpdateState.state}
                     onSuccess={() => {
                     setShowUpdateCall(false);
                     setServerUpdateState({ state: "pending" });
                    }}
                     onCancel={() => {
                     setShowUpdateCall(false);
                     setServerUpdateState({ state: "pending" });
                   }}
                   />              
                </Row>
                <Chart
                        isEnglish={isEnglish}
                        dataActive={shoppingList.filter((item) => item.done === false).length}
                        dataInactive={shoppingList.filter((item) => item.done === true).length}
                    />
                
            </Col>
        </div>    
    );
}

export default ShoppingListForm;
