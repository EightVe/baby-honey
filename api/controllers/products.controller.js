

import Product from "../models/products.model.js";


export const createProduct = async (req, res) => {
  try {
    const { title, price, image, relatedImages, dataType } = req.body;

    const product = new Product({
      title,
      price,
      image,
      relatedImages,
      dataType,
    });

    const savedProduct = await product.save();
    res.status(201).json({ message: 'Product created successfully', product: savedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create product', error });
  }
};

export const fetchProduct = async (req, res) => {
  const { dataType } = req.query; // Get the dataType from query parameter

  try {
    const filter = dataType ? { dataType } : {}; // If dataType is provided, filter by it

    // Find products with the filter (if provided) and sort them by createdAt
    const products = await Product.find(filter).sort({ createdAt: -1 });

    res.status(200).json({ 
      message: 'Products fetched successfully', 
      products 
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ 
      message: 'Failed to fetch products', 
      error 
    });
  }
};


export const fetchAllProducts = async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find().sort({ createdAt: -1 }); // Sort by most recent
    res.status(200).json({ message: 'Products fetched successfully', products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Failed to fetch products', error });
  }
};

// Controller for deleting a product
export const deleteProduct = async (req, res) => {
  const { productId } = req.params; // Get productId from URL params
  try {
    // Delete the product by its ID
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully', product: deletedProduct });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Failed to delete product', error });
  }
};