import React, { useState, useEffect } from 'react';
import ShoppingCards from '../components/Cards';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';

function ShoppingListPage({ logInUser, visibleLists }) {
 

  return (
    <div>
        <div>
          <ShoppingCards logInUser={logInUser} visibleLists={visibleLists} />
        </div>
    </div>
  );
}
export default ShoppingListPage;
