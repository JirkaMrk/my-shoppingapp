import React from 'react';
import { Container } from 'react-bootstrap';

function HomePage() {
    return (
        <Container className="mt-4">
          <div>
              <h1>Mrkvica Jiří</h1>
              <h1><p>-</p></h1>
              <h2>
                <p> Funkcionality DŮ2</p> 
                <p>V Shopping list page zvolte detail nákupního seznamu a</p>
                <p>budete odkázáni na editor page kde funkcionality dle Dů2</p>
                <p>todo název není ve stavu, po odsdílení uživatel nemůže</p>
                <p> měnit stav čehokoli.</p>
              </h2>
              <h2>
                <p>Funkcionality DŮ3</p> 
                <p>V Shopping list page použijte filtr aktivních/ neaktivních</p>
                <p>seznamů a přepínání uživatelů</p>
                <p>Přidávání ubírání dlaždic dle vlastníka</p>
                <p>mazat lze pouze listy kde je aktivní uživatel owner</p>
              </h2>
          </div>
        </Container>  
    );
}

export default HomePage;
