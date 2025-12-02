import { NavbarLayout } from "../components/Layouts/NavbarLayout";
import { HeroSection } from "../components/fragments/Hero";
import { CategoriesSection } from "../components/fragments/Categories";
import { ProductsSection } from "../components/fragments/Product";
import { Footer } from "../components/Layouts/FooterLayout";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slice/cartSlice";

// Halaman utama menampilkan hero, kategori, dan produk populer
export const HomePage = () => {
  const dispatch = useDispatch();

  // Kirim produk ke cart global (Redux)
  const handleAddToCart = (product) => dispatch(addToCart(product));

  return (
    // Tambahkan efek transisi saat halaman dimuat
    <div className="min-h-screen text-white page-transition" style={{ background: 'transparent' }}>
      <NavbarLayout />
      <HeroSection />
      <CategoriesSection />
      <ProductsSection onAddToCart={handleAddToCart} />
      <Footer />
    </div>
  );
};
