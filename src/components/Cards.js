import { Col, Row, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom"; 
import data from "../data/data.json";
import { useState } from "react";
import background from "../images/Background.jpg";

function ShoppingCards(props) {  // výpis karet jednotlivých nákupních seznamů

    const [selectedData, setSelectedData] = useState(null);
    const handleDetailClick = (dat) => { setSelectedData(dat);};
    const [setShow] = useState (false);

    console.log(props.visibleLists);
    console.log(props.logInUser);

    return (
      <Row>
          {data
          .filter((dat) => dat.ownerID === props.logInUser) 
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
                      {dat.note}
                    </Card.Text>
                    <Button variant="outline-secondary" onClick={() => handleDetailClick(dat._id)}>
                      <Link to={`/EditorPage/`}>Detail</Link>
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
