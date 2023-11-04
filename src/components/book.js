import ListGroup from 'react-bootstrap/ListGroup';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { FormControl, Row, Form, Col } from 'react-bootstrap';
import _uniqueId from 'lodash/uniqueId';

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
                        id='name'
                        type='text'
                        name='name'
                        defaultValue={props.name}
                        disabled={props.done === true ? true : false}
                    />
                </Col>
                <Col sm={2} className="my-1">
                    <FormControl
                        id='author'
                        type='text'
                        name='author'
                        defaultValue={props.author}
                        disabled={props.done === true ? true : false}
                    />
                </Col>
                <Col sm={2} className="my-1">
                    <FormControl
                        id='year'
                        type='text'
                        name='year'
                        defaultValue={props.year}
                        disabled={props.done === true ? true : false}
                    />
                </Col>
                <Col sm={1} className="my-1">
                    <Button variant="danger" onClick={props.onDelete}>
                        X
                    </Button>
                </Col>
            </Row>
        </ListGroup> 
        </Form>
    );
}

export default Book;