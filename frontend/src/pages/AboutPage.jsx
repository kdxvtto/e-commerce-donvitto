import { AboutLayout } from "../components/Layouts/AboutLayout";
import { Footer } from "../components/Layouts/FooterLayout";
import { NavbarLayout } from "../components/Layouts/NavbarLayout";

// Halaman informasi perusahaan
export const AboutPage = () => {
    return (
        // Gunakan transisi agar konten masuk lebih halus
        <div className="page-transition">
            <NavbarLayout />
            <AboutLayout />
            <Footer />
        </div>
    );
};
