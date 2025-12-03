import ShippingMethod from '../models/ShippingMethod.js';

// Ambil daftar metode pengiriman aktif dari DB
const getShippingMethods = async (req, res) => {
    try {
        // Hanya tampilkan yang aktif dan urutkan agar konsisten di UI
        const methods = await ShippingMethod.find({ isActive: true }).sort({ sortOrder: 1, name: 1 });
        res.status(200).json({
            data: methods,
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
};

export { getShippingMethods };
