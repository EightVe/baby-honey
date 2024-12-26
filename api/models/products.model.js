import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    image: {
      type: String,
    },
    relatedImages: {
      type: Array,
    },
    price: {
      type: Number,
      default : 0,
    },
    dataType: {
        type: String,
        enum : ['bb-s','pg-s','sc-s'],
        //bb-s : babyshooting / pg-s : pregnent-shooting / sc-s : smash-cake
        // this explenation is provided to the teacher reviewing source code (nisantasi universitesi).
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
