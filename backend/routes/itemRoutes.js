const express = require('express');
const {
  getItems,
  createItem,
  updateItem,
  deleteItem,
  updateItemOrder
} = require('../controller.js/itemController');

const router = express.Router();

router.get('/items', getItems);
router.post('/items', createItem);
router.put('/items/:id', updateItem);
router.delete('/items/:id', deleteItem);
router.post('/items/order', updateItemOrder);

module.exports = router;
