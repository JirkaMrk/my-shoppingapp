import React from 'react';
import { Container } from 'react-bootstrap';

function HomePage() {
    return (
        <Container className="mt-4">
          <div>
              <h1>Mrkvica Jiří</h1>
              <h1><p>-</p></h1>
              <h2>
                <p> Funkcionality DŮ4</p> 
                <p>server v src/backend (node index.js) port 3030</p>
                <p>spinner a volání serveru pro GET (karty) / POST (add new shopping List) / PUT (detail/ update karty)/ DELETE (delete)</p>
                <p>Po kliknutí update na kartě funkční zatím jen změna názvu karty</p>
                <p> pak ručně změnit routu na ShoppingListPage </p>
              </h2>
              
          </div>
        </Container>  
    );
}

export default HomePage;
