const fs = require('fs').promises; // promises - asynchronní operace
const path = require('path'); 
const { readFile, writeFile } = require('fs/promises'); // promises - asynchronní operace
const UniqueIdGenerator = require('../middleware/idGeneratorMiddleware.js');  // import id generatoru
const dataFilePath = path.resolve(__dirname, '../storage/data.json'); // cesta k souboru
const uniqueIdGenerator = UniqueIdGenerator();

async function readAllShoppingLists() { // asynchronní funkce pro čtení všech seznamů
    let fileContents; 
    try {
      fileContents = await fs.readFile(dataFilePath, { encoding: 'utf8' }); // přečte soubor
      return JSON.parse(fileContents); // vrátí obsah souboru
    } catch (e) {
      if (e.code === 'ENOENT') {  // pokud není nalezeno
        return [];  // vrátí prázdné pole
      } else {  // vrátí chybu
        console.error('Error reading shopping list file:', e);
        throw e; 
      }
    }
}

async function readShoppingListById() { // asynchronní funkce pro čtení seznamu podle id
  let fileContents;
  try {
    fileContents = await fs.readFile(dataFilePath, { encoding: 'utf8' }); // přečte soubor
    return JSON.parse(fileContents); // vrátí obsah souboru
  } catch (e) {
    if (e.code === 'ENOENT') { // pokud není nalezeno
      return [];  // vrátí prázdné pole
    } else {  // vrátí chybu
      console.error('Error reading shopping lists file:', e);
      throw e;
    }
  }
}

async function addShoppingList(newShoppingList) { // asynchronní funkce pro přidání seznamu
  let allShoppingLists = await readAllShoppingLists(); // přečte všechny seznamy
  // přidá unikátní id seznamu pomocí id generatoru
  newShoppingList._id = uniqueIdGenerator.generateUniqueId();
  // přidá nový seznam do pole seznamů
  allShoppingLists.push(newShoppingList);
  // zapíše nový seznam do souboru
  await fs.writeFile(dataFilePath, JSON.stringify(allShoppingLists, null, 2), { encoding: 'utf8' });
}

async function updateShoppingList(id, updatedShoppingList) { // asynchronní funkce pro aktualizaci seznamu
  let lists = await readAllShoppingLists(); // přečte všechny seznamy
  // najde seznam s odpovídajícím id
  let listIndex = lists.findIndex((list) => id === list.l_id);
  if (listIndex === -1) { // pokud není nalezeno
    throw new Error(`Shopping list with id ${id} not found`); // vrátí chybu
  }
  // spojí seznamy 
  const updatedList = { ...lists[listIndex], ...updatedShoppingList };
  // aktualizuje seznam
  lists[listIndex] = updatedList;
  // zapíše aktualizovaný seznam do souboru
  await _write(lists);
  //vratí aktualizovaný seznam
  return updatedList;
}
  
async function deleteShoppingList(id) { // asynchronní funkce pro smazání seznamu
  let lists = await readAllShoppingLists(); // přečte všechny seznamy
  // najde seznam s odpovídajícím id
  let listIndex = lists.findIndex((list) => id === list._id);
  // pokud není nalezeno
  if (listIndex === -1) {
    // vrátí chybu
    throw new Error(`Shopping list with id ${id} not found`);
  }
  // smaže seznam z pole seznamů
  lists.splice(listIndex, 1);
  // zapíše aktualizovaný seznam do souboru
  await _write(lists);
  // vrátí zprávu o úspěšném smazání seznamu
  return `Shopping list with id ${id} has been deleted`;
}

async function _write(data) { // asynchronní funkce pro zápis do souboru
  let json = JSON.stringify(data, null, 2);
  await writeFile(dataFilePath, json);
}

module.exports = { // export funkcí
    readAllShoppingLists,
    readShoppingListById,
    addShoppingList,
    updateShoppingList,
    deleteShoppingList
}