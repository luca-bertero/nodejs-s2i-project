const mongoose = require('mongoose');
const products = require('./products');
const users = require('./users');

const orderSchema = new mongoose.Schema({
  products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true}],
  users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}],
  data: { type: Date, default: Date.now}
});

module.exports = mongoose.model('Order', orderSchema);
