const express = require('express');
const router = express.Router();
const jsonParser = require('../middleware/jsonParser.js');
const validate = require('../middleware/ajvMiddleware.js');
const apiController = require('../abl/list-abl.js');
const getListsSchema = require('../schema/getListsSchema.js');
const getListIdSchema = require('../schema/getListIdSchema.js');
const addListSchema = require('../schema/addListSchema.js');
const updateListSchema = require('../schema/updateListSchema.js');
const deleteListSchema = require('../schema/deleteListSchema.js');


// GET endpoint for all shopping lists
router.get('/getLists', jsonParser, apiController.handleGetShoppingLists);

// GET endpoint shopping list by ID
router.get('/getList/:listId', jsonParser, validate(getListIdSchema), apiController.handleGetShoppingListById);

// POST endpoint for adding shopping list
router.post('/addList', jsonParser, apiController.handleAddShoppingList);

// PUT endpoint for updating shopping list
router.put('/updateList/:listId', jsonParser, validate(updateListSchema), apiController.handleUpdateShoppingListById);

// DELETE endpoint for removing an shopping list
router.delete('/deleteList/:listId',jsonParser, apiController.handleDeleteShoppingListById);

module.exports = router;


