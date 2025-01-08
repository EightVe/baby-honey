import express from 'express';
import { getCart, deleteCartItem, emptyCart,AddItemCart } from '../controllers/cart.controller.js';
import { authenticateToken } from '../utils/verifyUser.js';
const router = express.Router();

router.delete('/empty', authenticateToken, emptyCart);
router.post('/delete-item', authenticateToken, deleteCartItem);
router.post('/add-item', authenticateToken, AddItemCart);
router.get('/get', authenticateToken, getCart);

export default router;
