import mongoose from 'mongoose';

// Schema produk dengan relasi ke kategori
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    quantity : {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
    },
    // Nilai dinamis yang dikirim ke frontend
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    sold: {
        type: Number,
        min: 0,
        default: 0
    },
    discount: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    }
},
    {
        timestamps: true
    }
);

export default mongoose.model('Product', ProductSchema);
