import React from "react";
import { useState } from "react";
import { Form, FormControl, Button, Col, Row, Container } from "react-bootstrap";

function AddBook(props) {
  const [listItem, setListItem] = useState("");
  const [amount, setAmount] = useState("");
  const [units, setUnits] = useState("");
  const [done, setDone] = useState(false);

  return (  // formulář pro přidání položky do seznamu
    <Form>
        <Container> 
            <Row className="align-items-center">
                  <div className="d-flex justify-content-center">
                    <Button  // přidá řádek a vynuluje hodnoty polí
                    variant="success" 
                    onClick={() => { props.onAdd({done, listItem, amount, units}); 
                     setListItem("");
                     setAmount("");
                     setUnits("");}} 
                    disabled={!listItem || !amount || !units}>
                        Add new item
                    </Button>
                  </div>
                <Col sm={7} className="my-1">
                    <FormControl
                        id='listItem'
                        type='text'
                        name='listItem'
                        value={listItem}
                        onChange={(e) => setListItem(e.target.value)}
                        placeholder="listItem"
                    />
                </Col>
                <Col sm={2} className="my-1">
                    <FormControl
                        id='amount'
                        type='text'
                        name='amount'
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="amount"
                    />
                </Col>
                <Col sm={2} className="my-1">
                    <FormControl
                        id='units'
                        type='text'
                        name='units'
                        value={units}
                        onChange={(e) => setUnits(e.target.value)}
                        placeholder="units"

                    />
                </Col>
            </Row>
        </Container>    
</Form>
     
  );
}

export default AddBook;

