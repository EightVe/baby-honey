import express from 'express';
import { sendApp,getApp} from '../controllers/book.controller.js';
import { authenticateToken } from '../utils/verifyUser.js';
const router = express.Router();

router.post('/send-appointment', authenticateToken, sendApp);
router.get('/get-appointments', authenticateToken, getApp);
// router.post('/change-app/:id', authenticateToken, changeApp);
export default router;
