import express from 'express';
import { createProduct,fetchProduct } from '../controllers/products.controller.js';

const router = express.Router();

// Route to create a product
router.post('/create', createProduct);
router.get('/fetch', fetchProduct);
export default router;
