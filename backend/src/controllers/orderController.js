import Order from '../models/Order.js';

// Ambil semua pesanan
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

// Ambil detail pesanan by ID
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

// Tambah pesanan baru
const addOrder = async (req,res) =>{
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        // Ambil item, pengiriman, dan metode bayar dari body (user dari token, orderNumber auto)
        const { items = [], shippingOptions, paymentMethod } = req.body;

        // Guard: harus ada item di keranjang
        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: 'Items must be a non-empty array' });
        }
        // Guard: wajib pilih jenis pengiriman
        if (!shippingOptions) {
            return res.status(400).json({ message: 'Shipping option is required' });
        }
        // Guard: wajib pilih metode pembayaran
        if (!paymentMethod) {
            return res.status(400).json({ message: 'Payment method is required' });
        }

        // Normalisasi item dan hitung subtotal per item
        const normalizedItems = items.map((item) => {
            const product = item.product || item.productId || item._id;
            const quantity = Number(item.quantity) || 0;
            const price = Number(item.price) || 0;
            return {
                product,
                quantity,
                price,
                subtotal: price * quantity
            };
        });

        const hasInvalidItem = normalizedItems.some(
            (item) => !item.product || item.quantity <= 0 || Number.isNaN(item.price)
        );
        if (hasInvalidItem) {
            return res.status(400).json({ message: 'Invalid item data' });
        }

        // Hitung total pesanan dari server supaya tidak bisa dimanipulasi client
        const totalAmount = normalizedItems.reduce((sum, item) => sum + item.subtotal, 0);
        const order = new Order({
            orderNumber : `ORDER-${Date.now()}`,
            user : userId,
            items: normalizedItems,
            totalAmount,
            shippingOptions,
            paymentMethod,
            status : 'pending'
        });
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

// Update data pesanan
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

// Hapus pesanan
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

export {
    getAllOrder,
    getOrderById,
    addOrder,
    updateOrder,
    deleteOrder
}
