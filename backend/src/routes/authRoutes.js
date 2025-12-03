import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import { 
    register,
    login,
    logout,
    userProfile
} from "../controllers/auth.js";

const router = express.Router();

// Rute autentikasi (register/login/logout/profile)
router.post("/register", register)
router.post("/login", login)
router.post("/logout/", verifyToken, logout)
router.get("/me", verifyToken, userProfile) // profil butuh token

export default router
