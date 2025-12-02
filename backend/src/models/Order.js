import mongoose from 'mongoose';

// Schema pesanan berisi item produk dan status
const orderSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            subtotal: {
                type: Number,
                required: true
            }
        },
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'delivered'],
        default: 'pending'
    }
},
    {
        timestamps: true
    }
);

export default mongoose.model('Order', orderSchema);
