import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema(
  {
    userId: {
      ref: "User",
      required: true,
      type: mongoose.Schema.Types.ObjectId,
    },
    productId: {
      ref: "Product",
      required: true,
      type: mongoose.Schema.Types.ObjectId,
    },
    category: {
      type: String,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
