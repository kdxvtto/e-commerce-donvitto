import mongoose from 'mongoose';

// Metode pembayaran yang bisa diatur dari backend (dinamis, bukan hardcode)
const paymentMethodSchema = new mongoose.Schema({
    name: { // label yang ditampilkan ke user
        type: String,
        required: true,
    },
    code: { // kode unik (mis. BANK_BCA, EWALLET_OVO)
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true,
    },
    description: { // detail singkat (bank/ewallet apa saja)
        type: String,
        default: ''
    },
    type: { // kategori utama untuk grouping
        type: String,
        enum: ['bank-transfer', 'e-wallet', 'credit-card', 'other'],
        default: 'other'
    },
    isActive: { // toggle on/off di UI
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

export default mongoose.model('PaymentMethod', paymentMethodSchema);
