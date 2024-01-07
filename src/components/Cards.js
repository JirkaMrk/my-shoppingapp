import { Col, Row, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import background from '../images/Background.jpg';
import ConfirmationDialog from './ConfirmationDialog';
import NewListModal from './NewListModal';
import axios from 'axios';
import ServerStateSpinner from './ServerStateSpinner';
import Chart from '../components/ShapeBarChart';

function ShoppingCards(props) {  // komponenta pro zobrazení seznamu položek

  const translations = {
    detail: {
      en: 'Detail',
      cs: 'Podrobnosti',
    },
    delete: {
      en: 'Delete',
      cs: 'Smazat',
    },
    addNewList: {
      en: 'Add new list',
      cs: 'Přidat nový seznam',
    },
    deleteConfirm: {
      en: 'Delete confirm',
      cs: 'Potvrzení smazání',
    },
    areYouSure: {
      en: 'Are you sure? You want to delete this list.',
      cs: 'Jste si jistý? Chcete smazat tento seznam.',
    },
    myList: {
      en: 'My list',
      cs: 'Můj seznam',
    },
    notMyList: {
      en: 'Shared list',
      cs: 'Sdílený seznam',
    },
    activeList: {
      en: 'Active list',
      cs: 'Aktivní seznam',
    },
    inactiveList: {
      en: 'Inactive list',
      cs: 'Neaktivní seznam',
    },
  };

  const [data, setData] = useState([]);
  const [reload, setReload] = useState(true);
  const [showGetCall, setShowGetCall] = useState(false);
  const [serverGetState, setServerGetState] = useState({ state: "pending" });
  const isEnglish = props.isEnglish;

  console.log("language", isEnglish);

  const reloadData = () => {
    setReload(!reload);
    setServerGetState({ state: "pending" });
  };

  useEffect(() => {
    const fetchData = async () => {
      setShowGetCall(true);
      axios.get('//localhost:3030/api/getLists')
      .then(response => {
        setDataList(response.data);
        
        setServerGetState({ state: "success" });
        setShowGetCall(false);

      })
      .catch(error => {
        setServerGetState({ state: "error" });
        console.error('Error fetching data:', error);
      });
    };
  
    fetchData();
  }, [reload]);

  const { logInUser, visibleLists } = props;
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

  const dataForChartUser = filterIdUsers.map((item) => { // funkce vrátí seznam položek pro graf pro shoppingListPage
    return {
      name: item.name.substring(0, 11), // omezení počtu znaků v názvu
      count: Array.isArray(item.listOfItems) ? item.listOfItems.length : 0, // počet položek
    };
  });

  return (
    <div>
      <div className='text-center'>
        <Button 
          variant="outline-dark" 
          size="lg" 
          className='mb-4' 
          onClick={handleShow}>
            {`${translations.addNewList[isEnglish ? 'en' : 'cs']}`}
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

            <Col key={dat._id} className="d-flex justify-content-center" md={5} lg={4} xl={3} xxl={2} >
              <Card className="ShoppingListCard text-center m-4" >
                <Card.Img src={background} alt="Shopping List" />
                <Card.Body>
                  <Card.Title>{dat.name}</Card.Title>
                  <Card.Text>{dat.ownerId === logInUser 
                  ? (
                    `${translations.myList[isEnglish ? 'en' : 'cs']}`
                  ) : (
                    `${translations.notMyList[isEnglish ? 'en' : 'cs']}`
                  )}</Card.Text>
                  <Card.Text>{dat.activeList === true 
                  ? (
                    `${translations.activeList[isEnglish ? 'en' : 'cs']}`
                  ) : (
                    `${translations.inactiveList[isEnglish ? 'en' : 'cs']}`
                  )}</Card.Text>
                  <Button variant="outline-success" onClick={() => handleDetailClick(dat._id)}>
                    <Link to={`/EditorPage/${dat._id}`}>
                    {`${translations.detail[isEnglish ? 'en' : 'cs']}`}
                      </Link>
                  </Button>
                  <Button 
                  variant="outline-danger" 
                  disabled={dat.ownerId !== logInUser}
                  onClick={() => handleDeleteClick(dat._id)}
                  >
                    {`${translations.delete[isEnglish ? 'en' : 'cs']}`}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
        <Chart // graf pro shoppingListPage
          isEnglish={isEnglish}
          dataForChartUser={dataForChartUser}
        />
        <ServerStateSpinner // spinner pro načtení 
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

        <ConfirmationDialog  // dialogové okno pro smazání
        show={showDelete} 
        isEnglish={isEnglish}
        handleClose={handleCancelDelete} 
        onConfirm={() => {
          handleConfirmDelete()
          setShowDeleteCall(true);
          setShowDeleteCall(true);
        }}
      
        title={`${translations.deleteConfirm[isEnglish ? 'en' : 'cs']}`}
        body={`${translations.areYouSure[isEnglish ? 'en' : 'cs']}`}
        />
        <ServerStateSpinner // spinner pro smazání
            show={showDeleteCall}
            isEnglish={isEnglish}
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
        isEnglish={isEnglish}
        handleClose={handleClose}
        handleShow={handleShow}
        onSubmit={handleNewListSubmit}
        reloadData={reloadData}
        />
         
    </Row>
    </div>
  );
}

export default ShoppingCards;

