import { Link } from "react-router-dom";
import { useMemo } from "react";
import { useProduct } from "../../hooks/product";

// Hero dengan statistik dinamis (jumlah produk dari backend)
export const HeroSection = () => {
  const { products, loading } = useProduct();
  const productCount = products?.length ?? 0;
  const totalSold = products.reduce((sum, p) => sum + (p.sold ?? 0), 0); // total barang terjual
  const avgRating =
    productCount > 0
      ? (products.reduce((sum, p) => sum + (p.rating ?? 0), 0) / productCount).toFixed(1)
      : "0.0";

  // Format angka agar lebih enak dibaca
  const formatNumber = (num) =>
    new Intl.NumberFormat('id-ID', { notation: 'compact', maximumFractionDigits: 1 }).format(num);

  const stats = [
    { label: 'Pelanggan puas', value: loading ? "..." : `${formatNumber(totalSold)}+` },
    { label: 'Rating rata-rata', value: loading ? "..." : `${avgRating}/5` },
    { label: 'Produk tersedia', value: loading ? "..." : `${formatNumber(productCount)}+` },
  ];

  // Ambil satu produk dari database untuk ditampilkan di hero (fallback ke placeholder)
  const heroProduct = products[0];
  const heroImage =
    heroProduct?.image ||
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80";
  const heroCategory =
    heroProduct?.category?.name || heroProduct?.categoryLabel || "Produk";
  const heroTitle = heroProduct?.name || "Produk unggulan";

  // Ambil kategori unik dari produk (fallback ke preset jika kosong)
  const categoryTags = useMemo(() => {
    const dynamic = Array.from(
      new Set(
        products
          .map((p) => {
            if (!p?.category) return null;
            if (typeof p.category === 'object' && p.category.name) return p.category.name;
            return p.category;
          })
          .filter(Boolean)
      )
    );
    const defaults = ['Elektronik', "Men's Fashion", "Women's Fashion", 'Home Appliances', 'Food & Beverages', 'Sports', 'Beauty'];
    return dynamic.length ? dynamic : defaults;
  }, [products]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white">
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_20%_20%,#6366f1_0,transparent_25%),radial-gradient(circle_at_80%_0%,#22d3ee_0,transparent_22%),radial-gradient(circle_at_20%_80%,#818cf8_0,transparent_22%)]" />
      <div className="absolute -left-20 -bottom-32 w-72 h-72 bg-indigo-500/20 blur-3xl rounded-full" />
      <div className="absolute -right-20 -top-32 w-72 h-72 bg-cyan-400/20 blur-3xl rounded-full" />

      <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="space-y-6 lg:w-1/2">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 px-3 py-1 rounded-full text-sm backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
              Koleksi baru jatuh tempo minggu ini
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Belanja produk favorit dengan penawaran eksklusif tiap hari.
            </h1>
            <p className="text-lg text-slate-200/90 max-w-xl">
              Temukan elektronik, fashion, home appliances, hingga beauty dalam satu tempat.
              Pengiriman cepat, harga transparan, dan layanan purna jual yang responsif.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button className="px-6 py-3 rounded-full bg-white text-slate-900 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition">
                <Link to="/product">
                  Jelajahi Produk
                </Link>
              </button>
              <button className="px-5 py-3 rounded-full border border-white/40 text-white hover:bg-white/10 transition">
                Lihat Promo Hari Ini
              </button>
              <span className="text-sm text-slate-200/80">Gratis ongkir untuk pesanan pertama</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur"
                >
                  <p className="text-xl font-semibold">{item.value}</p>
                  <p className="text-sm text-slate-200/80">{item.label}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              {categoryTags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-sm backdrop-blur"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="relative lg:w-1/2 w-full">
            <div className="absolute -left-6 -top-6 w-16 h-16 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute right-4 bottom-8 w-24 h-24 rounded-full bg-cyan-300/30 blur-3xl" />

            <div className="relative flex flex-col gap-6">
              <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-4">
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src={heroImage}
                    alt={heroTitle}
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-200/80">{heroCategory}</p>
                    <p className="text-lg font-semibold">{heroTitle}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-100 text-sm">-20%</span>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-4 lg:ml-16">
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=80"
                    alt="Floral summer dress"
                    className="w-full h-52 object-cover"
                  />
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-200/80">Women's Fashion</p>
                    <p className="text-lg font-semibold">Floral Summer Dress</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-indigo-400/20 text-indigo-100 text-sm">New</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
