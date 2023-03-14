const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  //_id: false,  
  /*id_product: {
    unique: true,
    required: true,
    type: Number
  },*/
  name: String,
});

//productSchema.index({id_product: 1, unique: true});

module.exports = mongoose.model('Product', productSchema);
