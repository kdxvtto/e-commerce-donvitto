import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import checkRole from '../middleware/checkRole.js';
import * as productValidation from '../middleware/productValidation.js';
import {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
} from '../controllers/productController.js';

const router = express.Router();

// Rute CRUD produk (tambah/update/delete butuh admin)
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', verifyToken, checkRole('admin'), productValidation.addProductValidation, addProduct);
router.put('/:id', verifyToken, checkRole('admin'), productValidation.updateProductValidation, updateProduct);
router.delete('/:id', verifyToken, checkRole('admin'), deleteProduct);

export default router;
