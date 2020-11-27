import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderItems: [{
    name: {type: String, required: true},
    qty: {type:Number, required: true},
    image: {type: String, required: true},
    cost: {type: String, required: true},
    // Link to book model
    book: {type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
    },
  }],
  // Shipping address
  shipping:{
    address: {type: String, required: true},
    country: {type: String, required: true},
    postalCode: {type: String, required: true},
    city: {type: String, required: true},
  },
  // Payment
  payment: {type: String, required: true},
  // Summary
  itemsCost: {type: Number, required: true},
  shippingCost: {type: Number, required: true},
  tax: {type: Number, required: true},
  total: {type: Number, required: true},
  // User who orders
  user: {type: mongoose.Schema.Types.ObjectId,
        ref:'User', required:true
  },
  isPaid: {type: Boolean, default: false},
  paidOn: {type: Date},
  isDelivered: {type: Boolean, default: false},
  deliveredOn: {type: Date}
},{
  timestamps:true,
});

const Order = mongoose.model('Order', orderSchema);

export default Order;