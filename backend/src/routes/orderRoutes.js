import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import * as orderValidation from '../middleware/orderValidation.js';
import checkRole from '../middleware/checkRole.js';
import {
    getAllOrder,
    getOrderById,
    addOrder,
    updateOrder,
    deleteOrder
} from '../controllers/orderController.js';

const router = express.Router();

// Rute CRUD pesanan (update dilindungi admin)
router.get('/', getAllOrder);
router.get('/:id', getOrderById);
router.post('/', verifyToken, orderValidation.addOrderValidation, addOrder);
router.put('/:id', verifyToken, checkRole('admin'), orderValidation.updateOrderValidation, updateOrder);
router.delete('/:id', deleteOrder);

export default router;
