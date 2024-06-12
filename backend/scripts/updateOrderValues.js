const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Item = require('../models/item');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

const updateOrderValues = async () => {
  try {
    const items = await Item.find().sort({ createdAt: 1 });
    const updatePromises = items.map((item, index) => {
      item.order = index;
      return item.save();
    });
    await Promise.all(updatePromises);
    console.log('Order values updated successfully');
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.connection.close();
  }
};

const run = async () => {
  await connectDB();
  await updateOrderValues();
};

run();
