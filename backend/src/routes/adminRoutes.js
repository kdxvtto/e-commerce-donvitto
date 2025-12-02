import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import checkRole from '../middleware/checkRole.js';
import * as adminValidation from '../middleware/adminValidation.js';
import {
    getAllAdmins,
    getAdminById,
    addAdmin,
    updateAdmin,
    deleteAdmin
} from '../controllers/adminController.js';

const router = express.Router();

// Rute CRUD admin (hanya untuk role admin)
router.get('/', verifyToken, checkRole('admin'), getAllAdmins);
router.get('/:id', verifyToken, checkRole('admin'), getAdminById);
router.post('/', verifyToken, checkRole('admin'), adminValidation.addAdminValidation, addAdmin);
router.put('/:id', verifyToken, checkRole('admin'), adminValidation.updateAdminValidation, updateAdmin);
router.delete('/:id', verifyToken, checkRole('admin'), deleteAdmin);

export default router;
