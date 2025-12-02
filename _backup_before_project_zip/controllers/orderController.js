const Order = require('../models/Order');

const getAllOrder = async (req,res) => {
    try {
        const order = await Order.find()
        res.status(200).json({
            data : order,
            success : true
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success : false
        });
    }
}

const getOrderById = async (req,res) => {
    try{
        const order = await Order.findById(req.params.id)
        if(!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({
            data : order,
            success : true
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success : false
        });
    }
}

const addOrder = async (req,res) =>{
    try {
        const {
            orderNumber,
            user,
            items,
            totalAmount,
            status
        } = req.body
        const order = new Order({
            orderNumber,
            user,
            items,
            totalAmount,
            status
        });
        if(!orderNumber || !user || !items || !totalAmount || !status) {
            return res.status(400).json({ message: 'Order not valid' });
        }
        const newOrder = await order.save();
        res.status(201).json({
            data : newOrder,
            success : true
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success : false
        });
    }
}

const updateOrder = async (req,res) =>{
    try {
        const findOrder = await Order.findById(req.params.id);
        if (!findOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        const order = await Order.findByIdAndUpdate(
            req.params.id, 
            req.body, { 
                new: true,
                runValidators: true
            }
        );
        res.status(200).json({
            data : order,
            success : true
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success : false
        });
    }
}

const deleteOrder = async (req,res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if(!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({
            data : order,
            success : true
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success : false
        });
    }
}

module.exports = {
    getAllOrder,
    getOrderById,
    addOrder,
    updateOrder,
    deleteOrder
}