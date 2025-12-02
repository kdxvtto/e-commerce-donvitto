import {  useMemo, useState } from 'react';
import { Heart, Filter, Grid, List } from 'lucide-react';
import { useProduct } from '../../hooks/product';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slice/cartSlice';

// Halaman katalog produk dengan filter sederhana
export default function Product() {
  // Ambil data produk dari hook yang sudah handle loading/error.
  const { products, loading, error, refetch } = useProduct(); // Ambil data produk dari API.
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const dispatch = useDispatch();

  // Base URL backend untuk gambar dengan path relatif.
  const apiBase = useMemo(
    () => (import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api').replace(/\/api\/?$/, ''),
    []
  );

  const normalizeCategory = (product) => {
    if (!product?.category) return null;
    if (typeof product.category === 'object' && product.category?.name) {
      return product.category.name;
    }
    return product.category;
  };

  // Ambil kategori unik dari data produk (hasil populate) untuk filter.
  const categories = useMemo(() => {
    const defaultCategories = ['Semua', 'Pakaian', 'Sepatu', 'Aksesoris', 'Elektronik', 'Tas']; // tetap stabil di dalam memo
    const dynamic = Array.from(
      new Set(
        products
          .map((product) => normalizeCategory(product))
          .filter((cat) => Boolean(cat))
      )
    );
    return dynamic.length ? ['Semua', ...dynamic] : defaultCategories;
  }, [products]); // dependency cukup pada products karena defaultCategories lokal memo

  // Pastikan setiap produk punya label kategori dan angka default untuk rating/sold/discount.
  const normalizedProducts = products.map((product) => ({
    ...product,
    categoryLabel: normalizeCategory(product) ?? 'Kategori',
    rating: product.rating ?? 0,
    sold: product.sold ?? 0,
    discount: product.discount ?? 0,
  }));

  // Filter sesuai kategori yang dipilih.
  // Filter produk sesuai kategori yang dipilih.
  const filteredProducts = normalizedProducts.filter((product) => {
    if (selectedCategory === 'Semua') return true;
    return product.categoryLabel?.toLowerCase() === selectedCategory.toLowerCase();
  });

  // Urutkan sesuai pilihan user.
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return (a.price ?? 0) - (b.price ?? 0);
      case 'price-high':
        return (b.price ?? 0) - (a.price ?? 0);
      case 'newest':
        return new Date(b.createdAt ?? 0) - new Date(a.createdAt ?? 0);
      case 'rating':
        return (b.rating ?? 0) - (a.rating ?? 0);
      default:
        return (b.sold ?? 0) - (a.sold ?? 0);
    }
  });

  // Handler kategori: ubah kategori dan reset pagination ke halaman 1
  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  // Handler sort: ubah urutan dan reset pagination ke halaman 1
  const handleSortChange = (value) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / pageSize));
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Pastikan URL gambar bisa dipakai (handle path relatif).
  const imageFallback = 'https://via.placeholder.com/500?text=Produk';

  // Gunakan URL penuh apa adanya; kalau path relatif, gabungkan dengan host backend.
  const resolveImageSrc = (image) => {
    if (!image) return imageFallback;
    // Jika string langsung (termasuk URL penuh)
    if (typeof image === 'string') {
      const cleaned = image.replace(/\\/g, '/');
      if (/^https?:\/\//i.test(cleaned) || cleaned.startsWith('data:')) return cleaned;
      const normalized = cleaned.startsWith('/') ? cleaned : `/${cleaned}`;
      return `${apiBase}${normalized.replace(/^\/api/, '')}`;
    }
    // Jika objek (misal { url, secure_url, path })
    const nested = image.url || image.secure_url || image.path;
    return nested ? resolveImageSrc(nested) : imageFallback;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  // Kirim produk yang diklik ke Redux cart
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="text-white">
      {/* Breadcrumb */}
      <div className="bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center text-sm text-slate-200">
            <a href="#" className="hover:text-white">Beranda</a>
            <span className="mx-2">/</span>
            <span className="text-white font-medium">Produk</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar Filter */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white/5 rounded-lg shadow-sm p-6 sticky top-24 border border-white/10 backdrop-blur">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-white" />
                <h3 className="font-semibold text-lg text-white">Filter</h3>
              </div>

              {/* Kategori */}
              <div className="mb-6">
                <h4 className="font-medium mb-3 text-white">Kategori</h4>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategoryChange(cat)}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                        selectedCategory === cat
                          ? 'bg-indigo-500/30 text-white font-medium border border-indigo-300/40'
                          : 'text-slate-200 hover:bg-white/10'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Range Harga */}
              <div className="mb-6">
                <h4 className="font-medium mb-3 text-white">Rentang Harga</h4>
                <div className="space-y-2 text-slate-200">
                  <label className="flex items-center">
                    <input type="radio" name="price" className="mr-2" defaultChecked />
                    <span className="text-sm">Semua Harga</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="price" className="mr-2" />
                    <span className="text-sm">Di bawah Rp 500.000</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="price" className="mr-2" />
                    <span className="text-sm">Rp 500.000 - Rp 1.000.000</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="price" className="mr-2" />
                    <span className="text-sm">Di atas Rp 1.000.000</span>
                  </label>
                </div>
              </div>

              {/* Rating */}
              <div>
                <h4 className="font-medium mb-3 text-white">Rating</h4>
                <div className="space-y-2 text-slate-200">
                  {[5, 4, 3].map((rating) => (
                    <label key={rating} className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">⭐ {rating}+ ke atas</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className="bg-white/5 rounded-lg shadow-sm p-4 mb-6 border border-white/10 backdrop-blur">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {selectedCategory === 'Semua' ? 'Semua Produk' : selectedCategory}
                  </h2>
                  <p className="text-sm text-slate-200">{sortedProducts.length} produk ditemukan</p>
                </div>

                <div className="flex items-center gap-3">
                  {/* Sort */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-200">Urutkan:</span>
                  <select 
                    className="border border-white/10 bg-slate-900/60 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                  >
                    <option value="popular">Terpopuler</option>
                    <option value="newest">Terbaru</option>
                    <option value="price-low">Harga Terendah</option>
                    <option value="price-high">Harga Tertinggi</option>
                      <option value="rating">Rating Tertinggi</option>
                    </select>
                  </div>

                  {/* View Mode */}
                  <div className="flex gap-1 border border-white/10 rounded-lg p-1 bg-white/5">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded ${viewMode === 'grid' ? 'bg-indigo-500/30 text-white' : 'text-slate-200'}`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded ${viewMode === 'list' ? 'bg-indigo-500/30 text-white' : 'text-slate-200'}`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              : "flex flex-col gap-4"
            }>
              {loading && (
                <div className="col-span-full text-center text-slate-200 py-10">
                  Memuat produk...
                </div>
              )}

              {error && !loading && (
                <div className="col-span-full text-center text-rose-200 py-6 bg-rose-500/10 border border-rose-400/30 rounded-lg">
                  Gagal memuat produk: {error}
                  <button
                    onClick={refetch}
                    className="ml-3 text-indigo-200 hover:underline"
                  >
                    Coba lagi
                  </button>
                </div>
              )}

              {!loading && !error && sortedProducts.length === 0 && (
                <div className="col-span-full text-center text-slate-200 py-10">
                  Belum ada produk yang tersedia.
                </div>
              )}

              {!loading && !error && paginatedProducts.map((product) => {
                const price = Number(product.price) || 0;
                const discount = Number(product.discount) || 0;
                const discountedPrice = discount > 0 
                  ? price * (1 - discount / 100)
                  : price;
                const rawImage = product.image?.url
                  || product.image?.secure_url
                  || product.image?.path
                  || product.image
                  || product.imageUrl
                  || product.image_url;
                const imageSrc = resolveImageSrc(rawImage);

                return (
                  <div 
                    key={product._id ?? product.id} 
                    className={`bg-white/5 border border-white/10 rounded-lg shadow-sm hover:shadow-lg transition group overflow-hidden backdrop-blur ${
                      viewMode === 'list' ? 'flex gap-4' : 'flex flex-col'
                    }`}
                  >
                    {/* Image */}
                    <div className={`relative overflow-hidden flex-shrink-0 ${
                      viewMode === 'list' ? 'w-48 h-48' : 'w-full h-56'
                    }`}>
                      <img 
                        src={imageSrc}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = imageFallback;
                        }}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                      />
                      {discount > 0 && (
                        <div className="absolute top-3 left-3 bg-indigo-500/80 text-white text-xs font-bold px-2.5 py-1.5 rounded border border-white/20">
                          -{discount}%
                        </div>
                      )}
                      <button className="absolute top-3 right-3 p-2 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition shadow-lg border border-white/20">
                        <Heart className="w-4 h-4 text-white" />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex flex-col flex-1">
                      <div className="flex-1">
                        <p className="text-xs text-slate-200 mb-1.5 uppercase">{product.categoryLabel}</p>
                        <h4 className="font-semibold text-white mb-2.5 line-clamp-2 h-11 leading-tight text-sm">
                          {product.name}
                        </h4>
                        
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center">
                            <span className="text-yellow-400">⭐</span>
                            <span className="text-sm font-medium text-slate-200 ml-1">{product.rating}</span>
                          </div>
                          <span className="text-slate-400">•</span>
                          <span className="text-xs text-slate-200">Terjual {product.sold}</span>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="mb-3">
                        {discount > 0 ? (
                          <>
                            <p className="text-indigo-200 font-bold text-base">{formatPrice(discountedPrice)}</p>
                            <p className="text-slate-400 text-xs line-through">{formatPrice(price)}</p>
                          </>
                        ) : (
                          <p className="text-indigo-200 font-bold text-base">{formatPrice(price)}</p>
                        )}
                      </div>

                      <button 
                        onClick={() => handleAddToCart(product)}
                        className="w-full bg-indigo-500/90 text-white py-2.5 rounded-lg hover:bg-indigo-400/80 transition text-sm font-medium border border-white/10"
                      >
                        + Keranjang
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {!loading && !error && sortedProducts.length > 0 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  className="px-4 py-2 border border-white/10 rounded-lg hover:bg-white/10 disabled:opacity-50"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                {[...Array(totalPages)].map((_, idx) => {
                  const page = idx + 1;
                  return (
                    <button
                      key={page}
                      className={`px-4 py-2 rounded-lg border border-white/10 ${page === currentPage ? 'bg-indigo-500/80 text-white' : 'hover:bg-white/10'}`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  );
                })}
                <button
                  className="px-4 py-2 border border-white/10 rounded-lg hover:bg-white/10 disabled:opacity-50"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
