import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Product from '../src/models/Product.js';
import Category from '../src/models/Category.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load backend/.env agar MONGO_URI terbaca
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// 20 produk dengan nama/gambar spesifik, kategori diisi via categoryName yang dicocokkan ke koleksi Category.
const productsSeed = [
  {
    name: 'Wireless Mouse Pro',
    description: 'Mouse nirkabel ergonomis dengan DPI adjustable.',
    categoryName: 'Elektronik',
    quantity: 35,
    price: 175000,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Smartwatch Active',
    description: 'Jam tangan pintar dengan pemantau detak jantung dan GPS.',
    categoryName: 'Elektronik',
    quantity: 22,
    price: 1250000,
    image: 'https://images.unsplash.com/photo-1516557070061-c3d1653fa646?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Bluetooth Speaker Mini',
    description: 'Speaker portabel dengan bass punchy dan baterai 10 jam.',
    categoryName: 'Elektronik',
    quantity: 32,
    price: 290000,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Action Camera 4K',
    description: 'Kamera aksi 4K tahan air dengan stabilizer.',
    categoryName: 'Elektronik',
    quantity: 14,
    price: 1850000,
    image: 'https://images.unsplash.com/photo-1508899999219-d44b1901fb5a?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'RGB Gaming Keyboard',
    description: 'Keyboard mekanikal dengan lampu RGB dan switch tactile.',
    categoryName: 'Elektronik',
    quantity: 19,
    price: 860000,
    image: 'https://images.unsplash.com/photo-1517059224940-d4af9eec41e5?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Ceramic Dinner Set 12pcs',
    description: 'Set piring keramik minimalis untuk 4 orang.',
    categoryName: 'Rumah',
    quantity: 25,
    price: 360000,
    image: 'https://images.unsplash.com/photo-1484156818044-c040038b0710?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Smart Coffee Maker',
    description: 'Mesin kopi otomatis dengan pengaturan kekuatan seduh.',
    categoryName: 'Rumah',
    quantity: 15,
    price: 950000,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Nordic Desk Lamp',
    description: 'Lampu meja LED desain nordik dengan 3 mode cahaya.',
    categoryName: 'Rumah',
    quantity: 27,
    price: 240000,
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Nonstick Frying Pan 28cm',
    description: 'Wajan antilengket aluminium dengan handle nyaman.',
    categoryName: 'Rumah',
    quantity: 34,
    price: 260000,
    image: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Ergo Office Chair',
    description: 'Kursi kerja ergonomis dengan lumbar support.',
    categoryName: 'Rumah',
    quantity: 12,
    price: 1450000,
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Running Shoes Sprint X',
    description: 'Sepatu lari ringan dengan midsole empuk.',
    categoryName: 'Olahraga',
    quantity: 40,
    price: 680000,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Eco Yoga Mat',
    description: 'Matras yoga non-slip berbahan TPE ramah lingkungan.',
    categoryName: 'Olahraga',
    quantity: 45,
    price: 210000,
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Stainless Water Bottle',
    description: 'Botol minum stainless 750ml insulasi 12 jam.',
    categoryName: 'Olahraga',
    quantity: 60,
    price: 140000,
    image: 'https://images.unsplash.com/photo-1526402466340-977c9bbdb154?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Compact Dumbbell Set',
    description: 'Set dumbbell besi 2x5kg dengan grip nyaman.',
    categoryName: 'Olahraga',
    quantity: 26,
    price: 450000,
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Resistance Bands Kit',
    description: 'Paket resistance band 5 level lengkap dengan tas.',
    categoryName: 'Olahraga',
    quantity: 55,
    price: 190000,
    image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Denim Jacket Classic',
    description: 'Jaket denim biru klasik dengan lining lembut.',
    categoryName: 'Fashion',
    quantity: 18,
    price: 420000,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Oversize Fleece Hoodie',
    description: 'Hoodie fleece oversize hangat dan nyaman.',
    categoryName: 'Fashion',
    quantity: 42,
    price: 315000,
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Canvas Tote Bag',
    description: 'Tote bag kanvas tebal dengan saku dalam.',
    categoryName: 'Fashion',
    quantity: 55,
    price: 95000,
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Polarized Sunglasses',
    description: 'Kacamata hitam polarized dengan frame ringan.',
    categoryName: 'Aksesoris',
    quantity: 38,
    price: 275000,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Urban Backpack 20L',
    description: 'Ransel harian tahan air dengan kompartemen laptop.',
    categoryName: 'Aksesoris',
    quantity: 28,
    price: 330000,
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
  },
];

const normalize = (str) => str?.toString().trim().toLowerCase();

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/e-commerce');

  const categories = await Category.find().lean();
  if (!categories.length) {
    throw new Error('Koleksi categories kosong. Isi kategori dulu.');
  }

  const nameToId = new Map(categories.map((c) => [normalize(c.name), c._id]));
  const fallbackCategory = categories[0]._id;
  const missingNames = new Set();

  const docs = productsSeed.map((p) => {
    const matchedId = nameToId.get(normalize(p.categoryName));
    if (!matchedId) missingNames.add(p.categoryName);
    return {
      name: p.name,
      description: p.description,
      category: matchedId || fallbackCategory,
      quantity: p.quantity,
      price: p.price,
      image: p.image,
    };
  });

  await Product.insertMany(docs);
  console.log(`Inserted ${docs.length} products`);
  if (missingNames.size) {
    console.warn('Kategori tidak ketemu, dipakai fallback:', [...missingNames].join(', '));
  }

  await mongoose.disconnect();
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
