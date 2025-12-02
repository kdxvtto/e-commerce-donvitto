// Auth controller: handle register/login/logout dan endpoint profil sederhana
import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';
import User from '../models/User.js';
import { blacklistToken } from '../utils/blacklistt.js';

// Daftarkan user/admin baru
const register = async (req,res) => {
    try {
        const { name, email, password, address, role } = req.body;
        if(!name || !email || !password || !address || !role){
            return res.status(400).json({
                success : false,
                message: 'All fields are required'
            });
        }
        const userExists = await User.findOne({ email });
        if(userExists){
            return res.status(400).json({
                success : false,
                message: 'User already exists'
            });
        }
        const adminExists = await Admin.findOne({ email });
        if(adminExists){
            return res.status(400).json({
                success : false,
                message: 'Admin already exists'
            });
        }
        if(password.length < 6){
            return res.status(400).json({
                success : false,
                message: 'Password must be at least 6 characters'
            });
        }

        // Password hashing is handled in the Admin/User schema hooks; store plain input here.
        if(role === 'admin'){
            const admin = new Admin({
                name,
                email,
                password,
                address
            });
            const savedAdmin = await admin.save();
            const newAdmin = await Admin.findById(savedAdmin._id).select('-password');
            res.status(201).json({
                data : newAdmin,
                success : true
            });
        } else{
            const user = new User({
                name,
                email,
                password,
                address
            });
            const savedUser = await user.save();
            const newUser = await User.findById(savedUser._id).select('-password');
            res.status(201).json({
                data : newUser,
                success : true
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success : false
        });
    }
}
// Login user/admin dan kembalikan JWT
const login = async (req,res) => {
    try {
        const { email, password } = req.body;
        const jwtSecret = process.env.JWT_SECRET;
        // Guard: server harus punya JWT_SECRET agar bisa sign token
        if (!jwtSecret) {
            return res.status(500).json({
                success: false,
                message: 'Server misconfigured: JWT_SECRET is missing'
            });
        }
        // Explicitly include password because schemas mark it select: false by default.
        const admin = await Admin.findOne({ email }).select('+password')
        if (admin){
            const isMatch = await bcrypt.compare(password, admin.password)
            if(isMatch){
                const token = jsonwebtoken.sign({ 
                    id: admin._id, role: 'admin' 
                    }, 
                    jwtSecret, 
                    { 
                        expiresIn: '1h', 
                    });
                    return res.status(200).json({ 
                        success : true,
                        message: 'Login successful', 
                        token 
                });
            }
            else{
                return res.status(401).json({
                    success : false, 
                    message: 'Invalid credentials' 
                });
            }
        } 
        // Explicitly include password because schemas mark it select: false by default.
        const user = await User.findOne({ email}).select('+password')
        if (user){
            const isMatch = await bcrypt.compare(password, user.password)
            if(isMatch){
                const token = jsonwebtoken.sign({ 
                    id: user._id, role: 'user' 
                    }, 
                    jwtSecret, 
                    { 
                        expiresIn: '1h', 
                    });
                    return res.status(200).json({ 
                        success : true,
                        message: 'Login successful', 
                        token 
                });
            } else {
                return res.status(401).json({
                    success : false, 
                    message: 'Invalid credentials'
                 });
            }
        } 
        return res.status(401).json({
            success : false, 
            message: 'Invalid credentials'
        });
    } catch (error) {
        res.status(500).json({ 
            success : false, 
            message: error.message,
        });
    }
}

// Blacklist token aktif (logout)
const logout = async (req,res) => {
    try {
      const token = req.token ||req.headers.authorization?.split(' ')[1];
      if(!token){
          return res.status(401).json({ 
              success : false, 
              message: 'Unauthorized' 
          });
      }
     const decoded = jsonwebtoken.decode(token);
      if(!decoded || !decoded.exp){
          return res.status(401).json({ 
              success : false, 
              message: 'Invalid token' 
          });
      }
      await blacklistToken(token, decoded.exp);
      res.status(200).json({ 
          success : true, 
          message: 'Logout successful' 
      });
    } catch (error) {
        res.status(500).json({ 
            success : false, 
            message: error.message,
        });
    }
}

// Placeholder profil user (hanya contoh response)
const userProfile = async (req,res) => {
    try {
        res.status(200).json({ 
            success : true,
            message: 'User profile' 
        });
    } catch (error) {
        res.status(500).json({ 
            success : false, 
            message: error.message,
        });
    }
}

export {
    register,
    login,
    logout,
    userProfile
}
