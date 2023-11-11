import { Col, Row, Card, Button } from "react-bootstrap"; 
import data from "../data/data.json";
import { useState } from "react";
import background from "../images/Background.jpg";

function ShoppingCards() {  // výpis karet jednotlivých nákupních seznamů
    const [setShow] = useState (false);
    return (
      <Row>
          {data.map((dat) =>  {
            return (
              <Col key={dat._id} className='d-flex justify-content-center' md={5} lg={4} xl={3} xxl={2}>
                <Card className="ShoppingListCard text-center m-4">
                <Card.Img src={background} alt="Shopping List" />
                  <Card.Body>
                    <Card.Title>{dat.name}</Card.Title>
                    <Card.Text>
                      {dat.note}
                    </Card.Text>
                    <Button variant="outline-secondary" onClick={() => setShow(true)}>
                        Detail
                   </Button>
                  </Card.Body>
                </Card>
              </Col>
          )})}  
      </Row>           
    );
      

}
  
export default ShoppingCards;
