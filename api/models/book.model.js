import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema(
  {
    cartItems: [
        {
          productName: { type: String, required: true },
          price: { type: Number, required: true },
          img: { type: String, required: false },
        },
      ],
   userId: {
          ref: "User",
          required: true,
          type: mongoose.Schema.Types.ObjectId,
    },
    emailAddress: {
        type: String,
        required: true,
      },
    booking_date: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Book = mongoose.model('Book', BookSchema);

export default Book;
