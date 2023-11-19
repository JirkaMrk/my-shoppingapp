import { Col, Row, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import background from '../images/Background.jpg';
import ConfirmationDialog from './ConfirmationDialog';
import NewListModal from './NewListModal';

function ShoppingCards(props) {

  const handleNewListSubmit = (formData) => {
    setDataList((prevDataList) => [...prevDataList, formData]);
  }; 

  const { data, logInUser, visibleLists, onDelete } = props;
  const [dataList, setDataList] = useState(data);
  const [selectedData, setSelectedData] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log("data",data);
  console.log("dataList",dataList);

  const handleDetailClick = (dat) => {
    setSelectedData(dat);
  };

  const handleDeleteClick = (id) => {
    setItemToDelete(id);
    setShowDelete(true);
  };

  function handleConfirmDelete() {
    setDataList((prevList) => {
      const newList = prevList.filter((item) => item._id !== itemToDelete);
      return newList;
    });
    handleCloseDelete();
  }


  const handleCancelDelete = () => {
    setItemToDelete(null);
    handleCloseDelete();
  };

  const filterIdUsers = dataList.filter((item) => {
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
        show={showDelete} 
        handleClose={handleCancelDelete} 
        onConfirm={handleConfirmDelete}
        title="Confirm delete"
        body="Are you sure you want to delete this list?"
        />
        <NewListModal 
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

