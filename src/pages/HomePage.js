import React from 'react';
import { Container } from 'react-bootstrap';
import styles from '../Styles/HomePage.css'; // todo

function HomePage() {
    return (
        <Container className='mt-4'>
          <div className={styles}>
              <h1>Mrkvica Jiří</h1>
              <h2>
                <p>V Shopping list page zvolte detail nákupního seznamu a</p>
              <p>budete odkázáni na editor page kde fungují všechny</p>
              <p> funkcionality DŮ2</p> 
              </h2>
          </div>
        </Container>  
    );
}

export default HomePage;
