/*
import React from 'react';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, ToggleButton, Button, Form } from 'react-bootstrap';

function ShoppingForm() {
  const [rows, setRows] = useState([{ checkBox: '', item: '', quantity: '', units: '' }]);

  const handleAddRow = () => {
    const newRow = { checkBox: '', item: '', quantity: '', units: '' };
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

  const [checked, setChecked] = useState(false);

  return (
    <Form onSubmit={handleSubmit}>
      <Col sm={11} className="my-1">
        <Row className="align-items-center">
          <Form.Control type="text" name="nameList" placeholder="Název nákupního seznamu" />
        </Row>
        <Row className="align-items-center">
          <Form.Control type="text" name="noteList" placeholder="Poznámka nákupního seznamu" />
        </Row>
      </Col>

      {rows.map((row, index) => (
        <Row
          key={index}
          className={`align-items-center ${checked && !row.checkBox ? 'd-none' : ''}`}
        >
          <Col sm={1} className="my-1">
            <Form.Check
              type="checkbox"
              name="checkBox"
              label="Ok"
              value={row.checkBox}
              onChange={(event) => handleRowChange(index, event)}
            />
          </Col>
          <Col sm={6} className="my-1">
            <Form.Control
              type="text"
              name="item"
              placeholder="Co"
              value={row.item}
              onChange={(event) => handleRowChange(index, event)}
            />
          </Col>
          <Col sm={2} className="my-1">
            <Form.Control
              type="text"
              name="quantity"
              placeholder="Množství"
              value={row.quantity}
              onChange={(event) => handleRowChange(index, event)}
            />
          </Col>
          <Col sm={2} className="my-1">
            <Form.Control
              type="text"
              name="units"
              placeholder="Jednotky"
              value={row.units}
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
      <Col sm={11} className="my-1">
        <Row sm={5}>
          <Button variant="primary" onClick={handleAddRow}>
            Přidat řádek
          </Button>
          <Button variant="success" type="Submit">
            Uložit seznam
          </Button>
          <Button variant="primary" type="Submit">
            Sdílet seznam
          </Button>
          <Button variant="danger" type="Submit">
            Smazat seznam
          </Button>
          <ToggleButton
            id="toggle-check"
            type="checkbox"
            variant="outline-primary"
            checked={checked}
            value="1"
            onChange={(e) => setChecked(e.currentTarget.checked)}
          >
            Zobrazit hotové
          </ToggleButton>
        </Row>
      </Col>
    </Form>
  );
}

export default ShoppingForm;
*/