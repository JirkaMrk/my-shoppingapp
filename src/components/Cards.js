import { Col, Row, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import background from '../images/Background.jpg';
import ConfirmationDialog from './ConfirmationDialog';


function ShoppingCards(props) {
  const { data, logInUser, visibleLists, onDelete } = props;
  const [dataList, setDataList] = useState(data);
  const [selectedData, setSelectedData] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDetailClick = (dat) => {
    setSelectedData(dat);
  };

  const handleDeleteClick = (id) => {
    setItemToDelete(id);
    setShow(true);
  };

  function handleConfirmDelete() { // funkce pro smazání položky seznamu dataList
    setDataList(([...list]) => {  // vytvoří nový seznam, který obsahuje všechny položky z původního seznamu
        const index = list.findIndex((item) => item._id === itemToDelete);  
         // najde index položky item._id, kterou chceme smazat itemToDelete
        list.splice(index, 1);    // smaže položku ze seznamu 
        return list;  // vrátí nový seznam
    })
    handleClose();  // zavře dialogové okno
};

  const handleCancelDelete = () => {
    setItemToDelete(null);
    handleClose();
  };

  const filterIdUsers = dataList.filter((item) => {
    const userIds = item.userId ? item.userId.map((user) => user.userId) : [];
    return userIds.includes(logInUser) || logInUser === item.ownerId;
  });

  console.log(dataList);

  return (
    <Row>
      {filterIdUsers
        .filter(
          (dat) =>
            dat.activeList !== visibleLists && visibleLists === false || visibleLists === true
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
        <ConfirmationDialog
        show={show} 
        handleClose={handleCancelDelete} 
        onConfirm={handleConfirmDelete}
        title="Confirm delete"
        body="Are you sure you want to delete this list?"
/>
    </Row>
  );
}

export default ShoppingCards;
