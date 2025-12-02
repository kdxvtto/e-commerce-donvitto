import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import checkRole from '../middleware/checkRole.js';
import * as userValidation from '../middleware/userValidation.js';
import {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser
} from '../controllers/userController.js';

const router = express.Router();

// Rute CRUD user (dilindungi role admin)
router.get('/', verifyToken, checkRole('admin'), getAllUsers);
router.get('/:id', verifyToken, checkRole('admin'), getUserById);
router.post('/', verifyToken, checkRole('admin'), userValidation.addUserValidation, addUser);
router.put('/:id', verifyToken, checkRole('admin'), userValidation.updateUserValidation, updateUser);
router.delete('/:id', verifyToken, checkRole('admin'), deleteUser);

export default router;
