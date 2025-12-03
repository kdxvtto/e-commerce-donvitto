// Entrypoint Express: load env, setup middleware, register routes, connect DB, start server
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

// export routes
import adminRoutes from './routes/adminRoutes.js';
import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import shippingRoutes from './routes/shippingRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env from backend/.env even when server started from repo root.
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const app = express();

// Global middleware (CORS + body parsing)
app.use(cors({
  origin: 'http://localhost:5173', // alamat frontend Vite
  credentials: true,
}));
app.use(express.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve file statis (mis. upload gambar) supaya path /uploads dan /public bisa diakses dari frontend.
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use('/public', express.static(path.join(__dirname, '..', 'public')));

// API routes
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/authentication', authRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/payment-methods', paymentRoutes); // daftar metode pembayaran (dinamis)
app.use('/api/shipping-methods', shippingRoutes); // daftar metode pengiriman (dinamis)

// Connect database

const mongouri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/e-commerce';

mongoose.connect(mongouri).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
})

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
