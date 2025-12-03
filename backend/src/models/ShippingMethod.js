import mongoose from 'mongoose';

// Metode pengiriman dinamis (bisa diatur dari backend)
const shippingMethodSchema = new mongoose.Schema({
    name: { // nama layanan (Reguler, Express, Same Day)
        type: String,
        required: true,
    },
    code: { // kode unik untuk dikirim ke frontend/order
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true,
    },
    description: { // keterangan tambahan/estimasi
        type: String,
        default: ''
    },
    eta: { // estimasi waktu (contoh: "1-2 hari")
        type: String,
        default: ''
    },
    price: { // biaya pengiriman (flat fee)
        type: Number,
        required: true,
        default: 0
    },
    isActive: { // toggle tampil/tidak di UI
        type: Boolean,
        default: true
    },
    sortOrder: { // urutan tampil
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

export default mongoose.model('ShippingMethod', shippingMethodSchema);
