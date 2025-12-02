import { Footer } from "../components/Layouts/FooterLayout";
import { NavbarLayout } from "../components/Layouts/NavbarLayout";
import Product from "../components/Layouts/Product";

// Halaman daftar produk dengan navbar + konten katalog
export const ProductPages = () => {
    return (
        // Bungkus halaman dengan transisi masuk
        <div className="page-transition min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-900 text-white">
            <NavbarLayout />
            <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-900">
              <Product />
            </div>
            {/* Footer global di halaman produk */}
            <Footer />
        </div>
    );
};
