import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { FormControl, Row, Form, Col } from 'react-bootstrap';


function ShoppingListItem(props) {  // vypíše seznam položek v seznamu

    const isEnglish = props.isEnglish;

    const translations = {
        listItem: {
          en: 'List item',
          cs: 'Polozka',
        },
        amount: {
          en: 'Amount',
          cs: 'Mnozstvi',
        },
        units: {
          en: 'Units',
          cs: 'Jednotky',
        },
        delete: {
          en: 'Delete',
          cs: 'Smazat',
        },
        done: {
          en: 'Ok',
          cs: 'Ok',
        },
        toDo: {
            en: 'Need',
            cs: 'Kup',
            },
    };

    
    return (
        <Form>
         <ListGroup id={props} > 
            <Row className="align-items-center">
                <Col sm={2} className="my-1">
                    <Form.Check
                        id='checkBox'
                        type='checkbox'
                        name='checkBox'
                        label={props.done === true ? (
                            `${translations.done[isEnglish ? 'en' : 'cs']}`
                          ) : (
                            `${translations.toDo[isEnglish ? 'en' : 'cs']}`
                          )}
                        defaultChecked={props.done === true ? true : false}
                        onChange={props.onCheck}
                    />     
                </Col>
                <Col sm={5} className="my-1">
                    <FormControl
                        id='listItem'
                        type='text'
                        name={`${translations.listItem[isEnglish ? 'en' : 'cs']}`}
                        defaultValue={props.listItem}
                        disabled={props.done === true ? true : false}
                    />
                </Col>
                <Col sm={2} className="my-1">
                    <FormControl
                        id='amount'
                        type='text'
                        name={`${translations.amount[isEnglish ? 'en' : 'cs']}`}
                        defaultValue={props.amount}
                        disabled={props.done === true ? true : false}
                    />
                </Col>
                <Col sm={2} className="my-1">
                    <FormControl
                        id='units'
                        type='text'
                        name={`${translations.units[isEnglish ? 'en' : 'cs']}`}
                        defaultValue={props.units}
                        disabled={props.done === true ? true : false}
                    />
                </Col>
                <Col sm={1} className="my-1">
                    <Button variant="danger" onClick={props.onDelete}>
                    {`${translations.delete[isEnglish ? 'en' : 'cs']}`}
                    </Button>
                </Col>
            </Row>
          </ListGroup> 
        </Form>
    );
}

export default ShoppingListItem;
