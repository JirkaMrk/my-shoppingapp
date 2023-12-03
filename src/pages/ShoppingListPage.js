import React, { useState, useEffect } from 'react';
import ShoppingCards from '../components/Cards';

function ShoppingListPage({ logInUser, visibleLists }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('api/get');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(data);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <ShoppingCards data={data} logInUser={logInUser} visibleLists={visibleLists} />
        </div>
      )}
    </div>
  );
}
export default ShoppingListPage;
