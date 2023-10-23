import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';

function ShoppingForm() {
  const [rows, setRows] = useState([{ item: '', quantity: '', price: '' }]);

  const handleAddRow = () => {
    const newRow = { item: '', quantity: '', price: '' };
    setRows([...rows, newRow]);
  };

  const handleDeleteRow = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };

  const handleRowChange = (index, event) => {
    const { name, value } = event.target;
    const newRows = [...rows];
    newRows[index][name] = value;
    setRows(newRows);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(rows);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {rows.map((row, index) => (
        
        <Row key={index} className="align-items-center">
          <Col sm={1} className="my-1">
            <Form.Check // prettier-ignore
            type='checkbox'
            id="default-checkbox"
            label="Vyřízeno"
          />
            </Col>
         
          <Col sm={6} className="my-1">
            
            <Form.Control
              type="text"
              name="item"
              placeholder="Item"
              value={row.item}
              onChange={(event) => handleRowChange(index, event)}
            />    
          </Col>
          <Col sm={2} className="my-1">
            <Form.Control
              type="text"
              name="quantity"
              placeholder="Quantity"
              value={row.quantity}
              onChange={(event) => handleRowChange(index, event)}
            />
          </Col>
          <Col sm={1} className="my-1">
            <Form.Control
              type="text"
              name="price"
              placeholder="Price"
              value={row.price}
              onChange={(event) => handleRowChange(index, event)}
            />
          </Col>
          <Col sm={1} className="my-1">
            <Button variant="danger" onClick={() => handleDeleteRow(index)}>
              X
            </Button>
          </Col>
        </Row>
      ))}
      <Button variant="primary" onClick={handleAddRow} >
        Přidat řádek
      </Button>
      <Button variant="success" type="Submit" >
        Uložit seznam
      </Button>
      <Button variant="primary" type="Submit" >
        Sdílet seznam
      </Button>
      <Button variant="danger" type="Submit" >
        Smazat seznam
      </Button>
    
    </Form>
  );
}

export default ShoppingForm;
  

