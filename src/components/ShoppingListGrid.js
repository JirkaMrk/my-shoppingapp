import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { FormControl, Row, Form, Col, Modal } from 'react-bootstrap';


function Book(props) {

    return (
        <Form>
         <ListGroup id={props} > 
            <Row className="align-items-center">
                <Col sm={1} className="my-1">
                    <Form.Check
                        id='checkBox'
                        type='checkbox'
                        name='checkBox'
                        label="OK"
                        defaultChecked={props.done === true ? true : false}
                    />     
                </Col>
                <Col sm={6} className="my-1">
                    <FormControl
                        id='listItem'
                        type='text'
                        name='listItem'
                        defaultValue={props.listItem}
                        disabled={props.done === true ? true : false}
                    />
                </Col>
                <Col sm={2} className="my-1">
                    <FormControl
                        id='amount'
                        type='text'
                        name='amount'
                        defaultValue={props.amount}
                        disabled={props.done === true ? true : false}
                    />
                </Col>
                <Col sm={2} className="my-1">
                    <FormControl
                        id='units'
                        type='text'
                        name='units'
                        defaultValue={props.units}
                        disabled={props.done === true ? true : false}
                    />
                </Col>
                <Col sm={1} className="my-1">
                    <Button variant="danger" onClick={props.onDelete}>
                        Delete
                    </Button>
                </Col>
            </Row>
          </ListGroup> 
        </Form>
    );
}

export default Book;
