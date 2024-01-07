import React from 'react';
import { Container } from 'react-bootstrap';


function HomePage( props ) {

  const isEnglish = props.isEnglish;

  const translations = {
      homePage: {
        en: 'Shopping list aplication',
        cs: 'Aplikace nákupních seznamů',
      }
  };

    return (
        <Container className="content-center">
          <div>
              <h1>Mrkvica Jiří</h1>
              <h1><p>-</p></h1>
              <h1>{`${translations.homePage[isEnglish ? 'en' : 'cs']}`}</h1>
          </div>
        </Container>  
    );
}

export default HomePage;
