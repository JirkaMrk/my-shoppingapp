import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

function Book(props) {
    return (
        <ListGroup.Item className="my-1">
             {props.name}
             {props.autor}
             {props.rok}
            <Button variant="danger" onClick={props.onDelete}>
                X
            </Button>
        </ListGroup.Item>
    );
}

export default Book;