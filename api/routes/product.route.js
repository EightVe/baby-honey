import express from 'express';
import { createProduct,fetchProduct,deleteProduct ,fetchAllProducts} from '../controllers/products.controller.js';

const router = express.Router();

// Route to create a product
router.post('/create', createProduct);
router.get('/fetch', fetchProduct);
router.get('/fetch-all', fetchAllProducts)
router.delete('/delete-single/:productId', deleteProduct);
export default router;
