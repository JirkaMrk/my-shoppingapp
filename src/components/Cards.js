import { Col, Row, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import background from '../images/Background.jpg';
import ConfirmationDialog from './ConfirmationDialog';


function ShoppingCards(props) {
  const { data, logInUser, visibleLists, onDelete } = props;
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

  const handleConfirmDelete = () => {
    // Todo: Delete the item from the list
    //onDelete(itemToDelete);
    handleClose();
  };

  const handleCancelDelete = () => {
    setItemToDelete(null);
    handleClose();
  };

  const filterIdUsers = data.filter((item) => {
    const userIds = item.userId ? item.userId.map((user) => user.userId) : [];
    return userIds.includes(logInUser) || logInUser === item.ownerId;
  });

  console.log(data);

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
                  <Card.Text>{dat.ownerId === logInUser ? "My own List" : "Share List"}</Card.Text>
                  <Card.Text>{dat.activeList === true ? "Active" : "Inactive"}</Card.Text>
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
