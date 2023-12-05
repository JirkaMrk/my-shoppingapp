import React, { useState, useEffect } from 'react';
import ShoppingCards from '../components/Cards';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';

function ShoppingListPage({ logInUser, visibleLists }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      axios.get('//localhost:3030/api/getLists')
      .then(response => {
        // Handle the successful response
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        // Handle errors
        console.error('Error fetching data:', error);
      });
    };
  
    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <p>loading</p>
      ) : (
        <div>
          <ShoppingCards data={data} logInUser={logInUser} visibleLists={visibleLists} />
        </div>
      )}
    </div>
  );
}
export default ShoppingListPage;
