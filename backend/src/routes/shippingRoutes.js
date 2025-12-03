import express from 'express';
import { getShippingMethods } from '../controllers/shippingController.js';

const router = express.Router();

// Daftar metode pengiriman (ambil dari DB)
router.get('/', getShippingMethods);

export default router;
