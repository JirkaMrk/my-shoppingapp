import { Col, Row, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import background from '../images/Background.jpg';

function ShoppingCards(props) {
  const { data, logInUser, visibleLists, onDelete } = props;
  const [selectedData, setSelectedData] = useState(null);

  const handleDetailClick = (dat) => {
    setSelectedData(dat);
  };

  const handleDeleteClick = (id) => {
    // Todo: Delete the item from the list
    onDelete(id);
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
                  <Card.Text>{dat.ownerId}</Card.Text>
                  <Button variant="outline-success" onClick={() => handleDetailClick(dat._id)}>
                    <Link to={`/EditorPage/${dat._id}`}>Detail</Link>
                  </Button>
                  <Button variant="outline-danger" onClick={() => handleDeleteClick(dat._id)}>
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
    </Row>
  );
}

export default ShoppingCards;
