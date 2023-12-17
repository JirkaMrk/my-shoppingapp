import React from "react";
import { useState } from "react";
import { Form, FormControl, Button, Col, Row, Container } from "react-bootstrap";

function AddBook(props) {  // komponenta pro přidání položky do seznamu
  const [listItem, setListItem] = useState("");
  const [amount, setAmount] = useState("");
  const [units, setUnits] = useState("");
  const [done, setDone] = useState(false);
  const isEnglish = props.isEnglish

  const translations = {
    addItem: {
      en: 'Add item',
      cs: 'Přidat položku',
    },
    listItemL: {
      en: 'Item',
      cs: 'Položka',
    },
    amountL: {
      en: 'Amount',
      cs: 'Množství',
    },
    unitsL: {
      en: 'Units',
      cs: 'Jednotky',
    },

  };

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
                        {`${translations.addItem[isEnglish ? 'en' : 'cs']}`}
                    </Button>
                  </div>
                <Col sm={7} className="my-1">
                    <FormControl
                        id='listItem'
                        type='text'
                        name="listItem"
                        value={listItem}
                        onChange={(e) => setListItem(e.target.value)}
                        placeholder={`${translations.listItemL[isEnglish ? 'en' : 'cs']}`}
                    />
                </Col>
                <Col sm={2} className="my-1">
                    <FormControl
                        id='amount'
                        type='text'
                        name="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder={`${translations.amountL[isEnglish ? 'en' : 'cs']}`}
                    />
                </Col>
                <Col sm={2} className="my-1">
                    <FormControl
                        id='units'
                        type='text'
                        name="units"
                        value={units}
                        onChange={(e) => setUnits(e.target.value)}
                        placeholder={`${translations.unitsL[isEnglish ? 'en' : 'cs']}`}

                    />
                </Col>
            </Row>
        </Container>    
</Form>
     
  );
}

export default AddBook;

