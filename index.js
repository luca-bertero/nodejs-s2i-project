const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./Route/productRoutes');
const userRoutes = require('./Route/userRoutes');
const orderRoutes = require('./Route/orderRoutes');


const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Travel', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/",productRoutes);
app.use("/",userRoutes);
app.use("/",orderRoutes);


// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
