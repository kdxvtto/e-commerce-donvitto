import { Heart } from 'lucide-react';
import { useProduct } from '../../hooks/product';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../redux/slice/loginSlice';

// Grid produk populer di beranda (ambil dari hook useProduct)
export const ProductsSection = ({ onAddToCart }) => {
  const { products, loading, error } = useProduct();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(selectAuth);

  // Batasi hanya menampilkan sebagian produk (contoh: 10 item teratas)
  const visibleProducts = Array.isArray(products) ? products.slice(0, 10) : [];
  const fallbackImage = 'https://images.unsplash.com/photo-1556306535-0f07f5c5fbb6?auto=format&fit=crop&w=800&q=80';

  const formatPrice = (price) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price || 0);

  // Gunakan URL penuh apa adanya; jika path relatif, tetap tampilkan placeholder agar kartu tidak kosong.
  const resolveImage = (image) => {
    if (!image) return fallbackImage;
    const cleaned = typeof image === 'string' ? image.replace(/\\/g, '/') : image;
    if (typeof cleaned === 'string' && /^https?:\/\//i.test(cleaned)) return cleaned;
    return fallbackImage;
  };

  const renderSkeleton = () =>
    Array.from({ length: 8 }).map((_, idx) => (
      <div
        key={idx}
        className="bg-slate-900/70 rounded-2xl shadow-sm border border-white/10 animate-pulse"
      >
        <div className="h-44 bg-slate-800 rounded-t-2xl" />
        <div className="p-4 space-y-3">
          <div className="h-4 bg-slate-800 rounded w-3/4" />
          <div className="h-4 bg-slate-800 rounded w-1/2" />
          <div className="h-10 bg-slate-800 rounded" />
        </div>
      </div>
    ));

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white">
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_20%,#6366f1_0,transparent_25%),radial-gradient(circle_at_80%_0%,#22d3ee_0,transparent_22%),radial-gradient(circle_at_20%_80%,#818cf8_0,transparent_22%)]" />
      <div className="relative max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <p className="text-sm text-cyan-200 font-semibold">Pilihan Terbaik</p>
            <h3 className="text-3xl font-bold text-white">Produk Populer Minggu Ini</h3>
            <p className="text-sm text-slate-200/90">Kurasi cepat buat kamu yang pengen langsung checkout.</p>
          </div>
          <Link to ="/product"
            
            className="px-4 py-2 rounded-full bg-indigo-500/80 text-white hover:bg-indigo-400/80 transition text-sm font-semibold border border-white/15 shadow"
          >
            Lihat Semua
          </Link>
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-rose-400/40 bg-rose-500/10 text-rose-100 px-4 py-3">
            Gagal memuat produk: {error}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading
            ? renderSkeleton()
            : visibleProducts.map((product) => {
                const price = Number(product.price) || 0;
                const discount = Number(product.discount) || 0;
                const discountedPrice = discount > 0 ? price * (1 - discount / 100) : price;
                const badge = discount > 0 ? `-${discount}%` : 'Baru';

                return (
                  <div
                    key={product._id ?? product.id}
                    className="bg-slate-900/80 text-white rounded-2xl shadow-sm border border-white/10 hover:shadow-xl hover:-translate-y-1 transition transform group backdrop-blur"
                  >
                    <div className="relative overflow-hidden rounded-t-2xl">
                      <img
                        src={resolveImage(product.image || product.imageUrl || product.image_url)}
                        alt={product.name || 'Produk'}
                        className="w-full h-48 object-cover group-hover:scale-110 transition duration-300"
                      />
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-400/20 text-cyan-50 shadow border border-cyan-300/30">
                        {badge}
                      </span>
                      <button className="absolute top-3 right-3 p-2 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition shadow border border-white/20">
                        <Heart className="w-4 h-4 text-white" />
                      </button>
                    </div>
                    <div className="p-4 space-y-2">
                      <p className="text-xs uppercase tracking-wide text-slate-200">
                        {product.category?.name || product.categoryLabel || 'Kategori'}
                      </p>
                      <h4 className="font-semibold text-white line-clamp-2 min-h-[44px]">{product.name}</h4>
                      <div className="flex items-center gap-2">
                        <p className="text-lg font-bold text-cyan-200">{formatPrice(discountedPrice)}</p>
                        {discount > 0 && (
                          <p className="text-xs text-slate-400 line-through">{formatPrice(price)}</p>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          if (!isAuthenticated) return navigate('/login');
                          onAddToCart?.(product);
                        }}
                        className="w-full mt-2 bg-indigo-500/90 text-white py-2 rounded-xl hover:bg-indigo-400/80 transition font-semibold border border-white/10"
                      >
                        Tambah ke Keranjang
                      </button>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </section>
  );
};
