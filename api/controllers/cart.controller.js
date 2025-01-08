import Cart from '../models/cart.model.js'

export const getCart = async (req, res) => {
  const { userId } = req.query; // Get userId from query params

  try {
    // Fetch cart items and populate product details
    const getUserCart = await Cart.find({ userId })
      .populate('productId', 'title price image relatedImages dataType') // Populate product information
      .exec();

    if (!getUserCart.length) {
      return res.status(404).json({ message: 'No items in cart' });
    }

    res.status(200).json({
      message: 'Cart fetched successfully',
      getUserCart,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
export const deleteCartItem = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    await Cart.deleteOne({ userId, productId });
    res.status(200).json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete item', error: error.message });
  }
};

// Clear the cart
export const emptyCart = async (req, res) => {
  const { userId } = req.body;

  try {
    await Cart.deleteMany({ userId });
    res.status(200).json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to clear cart', error: error.message });
  }
};
  export const AddItemCart = async (req, res) => {
    const { userId, productId, category } = req.body;
  
    try {
      // Check if the item is already in the user's cart
      const existingCartItem = await Cart.findOne({ userId, productId });
      if (existingCartItem) {
        return res.status(400).json({ message: 'Item already in cart' });
      }
  
      // Create a new cart item
      const newCartItem = new Cart({
        userId,
        productId,
        category,
      });
  
      // Save the cart item to the database
      await newCartItem.save();
  
      res.status(201).json({
        message: 'Item added to cart successfully',
        cartItem: newCartItem,
      });
    } catch (error) {
      console.error('Error adding item to cart:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };