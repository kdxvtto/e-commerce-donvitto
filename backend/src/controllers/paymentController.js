import PaymentMethod from '../models/PaymentMethod.js';

// Ambil daftar metode pembayaran aktif dari DB (urutkan sesuai sortOrder)
const getPaymentMethods = async (req, res) => {
    try {
        // Seed default jika koleksi kosong
        const defaults = [
            { name: 'Transfer Bank', code: 'BANK_TRANSFER', description: 'BCA, Mandiri, BNI, BRI', type: 'bank-transfer', isActive: true, sortOrder: 1 },
            { name: 'E-Wallet', code: 'E_WALLET', description: 'GoPay, OVO, Dana, ShopeePay', type: 'e-wallet', isActive: true, sortOrder: 2 },
            { name: 'Kartu Kredit/Debit', code: 'CREDIT_CARD', description: 'Visa, Mastercard, JCB', type: 'credit-card', isActive: true, sortOrder: 3 },
        ];
        const count = await PaymentMethod.countDocuments();
        if (count === 0) {
            await PaymentMethod.insertMany(defaults);
        }

        // Hanya ambil yang aktif, urutkan agar tampil konsisten di UI
        const methods = await PaymentMethod.find({ isActive: true }).sort({ sortOrder: 1, name: 1 });
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

export { getPaymentMethods };
