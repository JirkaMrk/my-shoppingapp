import ListGroup from 'react-bootstrap/ListGroup';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { FormControl, Row, Form, Col } from 'react-bootstrap';

function Book(props) {

    return (
        <ListGroup id={props}>  
            <Row className="align-items-center">
                <Col sm={1} className="my-1">
                    <Form.Check
                        type='checkbox'
                        name='checkBox'
                        label="OK"
                        defaultChecked={props.done === "1" ? true : false}
                    />     
                </Col>
                <Col sm={6} className="my-1">
                    <FormControl
                        defaultValue={props.name}
                        disabled={props.done === "1" ? true : false}
                    />
                </Col>
                <Col sm={2} className="my-1">
                    <FormControl
                        defaultValue={props.author}
                        disabled={props.done === "1" ? true : false}
                    />
                </Col>
                <Col sm={2} className="my-1">
                    <FormControl
                        defaultValue={props.year}
                        disabled={props.done === "1" ? true : false}
                    />
                </Col>
                <Col sm={1} className="my-1">
                    <Button variant="danger" onClick={props.onDelete}>
                        X
                    </Button>
                </Col>
            </Row>
        </ListGroup> 
    );
}

export default Book;