import { Col, Row, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom"; 
import data from "../data/data.json";
import { useState } from "react";
import background from "../images/Background.jpg";


function ShoppingCards(props) {  // výpis karet jednotlivých nákupních seznamů

    const [selectedData, setSelectedData] = useState(null);
    const handleDetailClick = (dat) => { setSelectedData(dat);};
    const [setShow] = useState (false);
    const [selectedId, setSelectedId] = useState(null);
      
    const filterIdUsers = data.filter((item) => {  // filtr vyfiltrje seznamy, které obsahují ID uživatele a zároveň Vlastníka
      const userIds = item.userId ? item.userId.map((user) => user.userId) : [];
      return userIds.includes(props.logInUser) || props.logInUser === item.ownerId;
    });

    return ( 
      <Row>
          {filterIdUsers
          .filter((dat) => dat.activeList !== props.visibleLists && props.visibleLists === false || props.visibleLists === true)
          .map((dat) =>  {
            console.log(dat);
            
            return (
              <Col key={dat._id} className='d-flex justify-content-center' md={5} lg={4} xl={3} xxl={2}>
                <Card className="ShoppingListCard text-center m-4">
                  <Card.Img src={background} alt="Shopping List" />
                  <Card.Body>
                    <Card.Title>{dat.name}</Card.Title>
                    <Card.Text>
                      {dat.ownerId}
                    </Card.Text>
                    <Button variant="outline-secondary" onClick={() => handleDetailClick(dat._id)}>
                    <Link
                     to={`/EditorPage/${dat._id}`}>
                      Detail
                     </Link>
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          }
        )};
      </Row>           
    );
}

export default ShoppingCards;

