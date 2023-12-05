import { Col, Row, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import background from '../images/Background.jpg';
import ConfirmationDialog from './ConfirmationDialog';
import NewListModal from './NewListModal';
import axios from 'axios';
import ServerStateSpinner from './ServerStateSpinner';

function ShoppingCards(props) {  // komponenta pro zobrazení seznamu položek
  

  const { data, logInUser, visibleLists } = props;
  const [dataList, setDataList] = useState(data);
  const [selectedData, setSelectedData] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showDeleteCall, setShowDeleteCall] = useState(false);
  const [serverDeleteState, setServerDeleteState] = useState({ state: "pending" });

  const [showDelete, setShowDelete] = useState(false);  // stavy pro dialogové okno smazání
  const handleCloseDelete = () => setShowDelete(false);

  const [show, setShow] = useState(false);  // stavy pro dialogové okno nového seznamu
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleNewListSubmit = (formData) => {  // funkce přidá "formData" do seznamu "dataList"
    setDataList((prevDataList) => [...prevDataList, formData]);
  }; 

  const handleDetailClick = (dat) => {  // funkce nastaví "selectedData" na "dat"
    setSelectedData(dat);
  };

  const handleDeleteClick = (id) => {  // funkce nastaví "itemToDelete" na "id" a otevře dialogové okno
    setItemToDelete(id);
    setShowDelete(true);
  };

  function handleConfirmDelete() {  // funkce smaže položku z "dataList" a zavře dialogové okno
    axios.delete(`//localhost:3030/api/deleteList/${itemToDelete}`)
      .then(() => {
        setDataList((prevList) => {
          const newList = prevList.filter((item) => item._id !== itemToDelete);
          setServerDeleteState({ state: "success" });
          return newList;
        });
      })
      .catch((error) => {
        console.error('Error deleting list:', error);
        setServerDeleteState({ state: "error" });
      });
    handleCloseDelete();
  }


  const handleCancelDelete = () => {  // funkce zavře dialogové okno a vynuluje "itemToDelete"
    setItemToDelete(null);
    handleCloseDelete();
  };

  const filterIdUsers = dataList.filter((item) => {  
    // funkce vrátí seznam položek, které obsahují "logInUser" v poli "userId" nebo "ownerId"
    const userIds = item.userId ? item.userId.map((user) => user.userId) : [];
    return userIds.includes(logInUser) || logInUser === item.ownerId;
  });

  return (
    <div>
      <div className='text-center'>
                <Button 
                variant="outline-dark" 
                size="lg" 
                className='mb-4' 
                onClick={handleShow}>
                  Add new shopping list
                  </Button>
                </div>  
    <Row>

      {filterIdUsers  // zobrazení seznamu položek
        .filter(
          (dat) =>
            dat.activeList !== visibleLists && visibleLists === false || visibleLists === true    
            // filtruje seznam podle "visibleLists"
        )
        .map((dat) => {   
          
          return (
            <Col key={dat._id} className="d-flex justify-content-center" md={5} lg={4} xl={3} xxl={2}>
              <Card className="ShoppingListCard text-center m-4">
                <Card.Img src={background} alt="Shopping List" />
                <Card.Body>
                  <Card.Title>{dat.name}</Card.Title>
                  <Card.Text>{dat.ownerId === logInUser ? "My own List" : "Shared List"}</Card.Text>
                  <Card.Text>{dat.activeList === true ? "Active list" : "Inactive list"}</Card.Text>
                  <Button variant="outline-success" onClick={() => handleDetailClick(dat._id)}>
                    <Link to={`/EditorPage/${dat._id}`}>Detail</Link>
                  </Button>
                  <Button 
                  variant="outline-danger" 
                  disabled={dat.ownerId !== logInUser}
                  onClick={() => handleDeleteClick(dat._id)}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
        <ConfirmationDialog  // dialogové okno pro smazání
        show={showDelete} 
        handleClose={handleCancelDelete} 
        onConfirm={() => {
          handleConfirmDelete()
          setShowDeleteCall(true);
          setShowDeleteCall(true);
        }}
      
        title="Confirm delete"
        body="Are you sure you want to delete this list?"
        />
        <ServerStateSpinner // spinner pro smazání
            show={showDeleteCall}
            stateOfServer={serverDeleteState.state}
            onSuccess={() => {
                setShowDeleteCall(false);
                setServerDeleteState({ state: "pending" });
            }}
            onCancel={() => {
                setShowDeleteCall(false);
                setServerDeleteState({ state: "pending" });

            }}
        />

        <NewListModal  // dialogové okno pro nový seznam
        logInUser={logInUser}
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
        onSubmit={handleNewListSubmit}
        />
         
    </Row>
    </div>
  );
}

export default ShoppingCards;

