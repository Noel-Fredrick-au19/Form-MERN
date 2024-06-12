const Item = require('../models/item');

const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createItem = async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newItem = new Item({ name, description });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateItem = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const updatedItem = await Item.findByIdAndUpdate(id, { name, description }, { new: true });
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteItem = async (req, res) => {
  const { id } = req.params;

  try {
    await Item.findByIdAndDelete(id);
    res.json({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateItemOrder = async (req, res) => {
  const { orderedItems } = req.body; 

  try {
    const updatePromises = orderedItems.map((item, index) => {
      return Item.findByIdAndUpdate(item._id, { order: index }, { new: true });
    });

    await Promise.all(updatePromises);
    res.json({ message: 'Order updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getItems,
  createItem,
  updateItem,
  deleteItem,
  updateItemOrder
};
