import ShippingMethod from '../models/ShippingMethod.js';

// Ambil daftar metode pengiriman aktif dari DB
const getShippingMethods = async (req, res) => {
    try {
        // Seed default jika koleksi masih kosong
        const defaults = [
            { name: 'Reguler', code: 'REGULAR', eta: '3-5 hari', price: 15000, isActive: true, sortOrder: 1 },
            { name: 'Express', code: 'EXPRESS', eta: '1-2 hari', price: 35000, isActive: true, sortOrder: 2 },
            { name: 'Same Day', code: 'SAME_DAY', eta: 'Hari ini', price: 50000, isActive: true, sortOrder: 3 },
        ];
        const count = await ShippingMethod.countDocuments();
        if (count === 0) {
            await ShippingMethod.insertMany(defaults);
        }

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
