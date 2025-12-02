import User from '../models/User.js';

// Ambil daftar user (exclude password)
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password').lean();
        res.status(200).json({
            data : users,
            success : true
        });
    } catch (error) {
        res.status(500).json({ 
            message: error.message,
            success : false 
        });
    }
};

// Ambil user berdasarkan ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password').lean();
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            data : user,
            success : true
        });
    } catch (error) {
        res.status(500).json({ 
            message: error.message,
            success : false
         });
    }
};

// Tambah user baru
const addUser = async (req, res) => {
    try {
        const{
            name,
            email,
            password,
            address
        } = req.body;
        const user = new User({
            name,
            email,
            password,
            address
        });
        await user.save();
        res.status(201).json({
            data : user,
            success : true
        });
    } catch (error) {
        res.status(500).json({ 
            message: error.message,
            success : false
         });
    }
};

// Update data user
const updateUser = async (req, res) => {
    try {
        const findUser = await User.findById(req.params.id);
        if (!findUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        const user = await User.findByIdAndUpdate(
            req.params.id, 
            req.body, { 
                new: true,
                runValidators: true
            }
        );
        res.status(200).json({
            data : user,
            success : true
        });
    } catch (error) {
        res.status(500).json({ 
            message: error.message,
            success : false
         });
    }
};

// Hapus user
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            data : user,
            success : true
        });
    } catch (error) {
        res.status(500).json({ 
            message: error.message,
            success : false
         });
    }
};

export {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser
};
