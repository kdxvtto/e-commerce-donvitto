import { useMemo } from "react";
import { useProduct } from "../../hooks/product";

// Daftar kategori cepat di beranda (ambil dari data produk)
export const CategoriesSection = () => {
  const { products } = useProduct();
  // Ambil kategori unik dari produk (fallback ke default jika kosong)
  const categories = useMemo(() => {
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
    return dynamic.length ? dynamic : ['Pakaian', 'Sepatu', 'Aksesoris', 'Elektronik', 'Olahraga', 'Rumah Tangga'];
  }, [products]);
  
  return (
    <section className="relative w-full bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-900 text-white">
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_15%_20%,#6366f1_0,transparent_25%),radial-gradient(circle_at_85%_0%,#22d3ee_0,transparent_22%)] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800/80 border border-white/15 backdrop-blur">
            Kategori Pilihan
          </span>
          <span className="h-px flex-1 bg-white/10" />
        </div>
        <div className="flex overflow-x-auto space-x-3 pb-4">
          {categories.map((cat, idx) => (
            <button 
              key={idx}
              className="px-6 py-2 rounded-full bg-slate-800/90 border border-white/20 text-white font-semibold tracking-wide backdrop-blur shadow hover:-translate-y-0.5 hover:border-cyan-300/60 hover:text-cyan-100 hover:shadow-lg transition whitespace-nowrap"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
