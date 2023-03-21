const Order = require('../Entities/orders');

exports.getAllOrders = async (req, res) => {
  const date = req.query.date;

  try {
    if (!date) {
      const orders = await Order.find();
      if (!orders) {
        res.status(404).json({
          success: false,
          error: 'Order not found',
        });
        return;
      };

      res.json({
        success: true,
        data: orders,
      });
    }
    else{
      const ordersDate = await Order.find({data: {$gt: new Date(date)}});

      if (!ordersDate) {
        res.status(404).json({
          success: false,
          error: 'Order not found',
        });
        return;
      };

      res.json({
        success: true,
        data: ordersDate,
      });
    };

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(404).json({
        success: false,
        error: 'Order not found',
      });
      return;
    }
    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getOrderByProduct = async (req, res) => {
  try {
    const order = await Order.find({"products":req.params.id});
    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

exports.addOrder = async (req, res) => {
  try {
    const { products, users, date } = req.body;

    // Create a new instance of the Order model
    const order = new Order({
      products,
      users,
      data: new Date(date)
    });
    await order.save();
    res.status(201).json({
        success: true,
        data: order,
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!order) {
      res.status(404).json({
        success: false,
        error: 'Order not found',
      });
      return;
    }
    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      res.status(404).json({
        success: false,
        error: 'Order not found',
      });
      return;
    }
    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
