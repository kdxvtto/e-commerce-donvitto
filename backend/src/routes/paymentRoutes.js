import express from 'express';
import { getPaymentMethods } from '../controllers/paymentController.js';

const router = express.Router();

// Daftar metode pembayaran (diambil dari DB)
router.get('/', getPaymentMethods);

export default router;
