const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    require: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);
