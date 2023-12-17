import React, { useState, useEffect } from 'react';
import ShoppingCards from '../components/Cards';

function ShoppingListPage({ logInUser, visibleLists, isEnglish }) {
 

  return (
    <div>
        <div>
          <ShoppingCards isEnglish={isEnglish} logInUser={logInUser} visibleLists={visibleLists} />
        </div>
    </div>
  );
}
export default ShoppingListPage;
