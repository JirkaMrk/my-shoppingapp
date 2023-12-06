const {
  readAllShoppingLists,
  readShoppingListById,
  addShoppingList,
  updateShoppingList,
  deleteShoppingList
}
= require('../dao/list-dao.js');

const user = require('../storage/users.json')


// get all shopping lists/ all users 
async function handleGetShoppingLists(req, res) {  
    try {
      const shoppingList = await readAllShoppingLists(); // přečte všechny seznamy dao
      res.json(shoppingList);  // vrátí všechny seznamy
    } catch (e) { // vrátí chybu 
      if (e.code === 'ENOENT') {  // pokud není nalezeno
        res.json([]);  // vrátí prázdné pole
      } else {  // jinak vrátí chybu
        console.error('Error reading shopping list:', e);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }
}

// get shopping list by id/ all users
async function handleGetShoppingListById(req, res) {
  try {
    const allShoppingLists = await readShoppingListById(); // přečte všechny seznamy dao
    const listId = req.params.listId; // listId je součástí URL parametrů
    // najdi vybraný seznam dle listId  
    const selectedShoppingList = allShoppingLists.find(list => list._id === listId);

    if (selectedShoppingList) { // pokud je nalezen
      res.json(selectedShoppingList);  // vrátí vybraný seznam
    } else {  // jinak vrátí chybu
      res.status(404).json({ message: 'Shopping list not found' });
    }
  } catch (e) {  // vrátí chybu
    if (e.code === 'ENOENT') {  // pokud není nalezeno
      res.json([]); // vrátí prázdné pole
    } else {   // vrátí chybu
      console.error('Error reading shopping list:', e);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } 
}



// add shopping list/ all users
async function handleAddShoppingList(req, res) {

    try {
      const newShoppingList = req.body; // předpokládáme, že nový seznam je součástí "body" požadavku
      await addShoppingList(newShoppingList); // přidá nový seznam dao
      requestData = req.body;   
      res.status(201).json({ message: 'Shopping list added successfully', data: requestData }); // vrátí zprávu o úspěšném přidání seznamu
    } catch (e) { // vrátí chybu serveru
      console.error('Error adding shopping list:', e);
      res.status(500).json({ message: 'Internal Server Error' });
    }
}

// update shopping list/ owner only
async function handleUpdateShoppingListById(req, res) {
  try {
      const listId = req.params._id; // listId je součástí URL parametrů
      const updatedShoppingList = req.body;  // předpokládáme, že nový seznam je součástí "body" požadavku
      delete updatedShoppingList._id; // odstraní listId z objektu seznamu
      // aktualizuje seznam
      const shoppingList = await updateShoppingList(listId, updatedShoppingList); // aktualizuje seznam dao dle listId

      if (shoppingList) { // pokud je nalezen
        res.status(200).json({ data: shoppingList });
      } else { // vrátí chybu nenalezení listId seznamu
        res.status(404).json({ errors: [`A shopping list with the id ${listId} was not found`] });
      }
  } catch (error) { //  vrátí chybu serveru
    console.error(error); 
    res.status(500).json({ errors: [error.message] });
  }
}

// delete shopping list/
async function handleDeleteShoppingListById(req, res) {
  try {
    const allShoppingLists = await readShoppingListById(); // přečte všechny seznamy
    const listId = req.params.listId; // listId je součástí URL parametrů

    // najdi vybraný seznam dle listId
    const selectedShoppingList = allShoppingLists.find(list => list._id === listId);

    // zkontroluje, zda je seznam nalezen
   
        const shoppingList = await deleteShoppingList(listId);  // smaže seznam dao dle listId
        if (shoppingList) { // pokud je nalezen
          res.status(200).json({ data: shoppingList }); // vrátí zprávu o úspěšném smazání seznamu
        } else {  // jinak vrátí chybu nenalezení Id seznamu
          res.status(404).json({ errors: [`A shopping list with the id ${listId} was not found`] });
        }
  } catch (error) { // vrátí chybu serveru
    console.error(error);
    res.status(500).json({ errors: [error.message] });
  }
}

module.exports = { // exportuje funkce
  handleAddShoppingList,
  handleGetShoppingLists,
  handleGetShoppingListById,
  handleUpdateShoppingListById,
  handleDeleteShoppingListById
};
