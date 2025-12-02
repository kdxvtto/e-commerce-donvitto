import mongoose from 'mongoose';

// Schema kategori produk
const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
);

export default mongoose.model('Category', CategorySchema);
