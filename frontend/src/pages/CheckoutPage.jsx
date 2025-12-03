import { CheckoutLayout } from "../components/Layouts/CheckoutLayout";
import { Footer } from "../components/Layouts/FooterLayout";

export const CheckoutPage = () => {
    return (
        // Gunakan transisi agar konten masuk lebih halus
        <div className="page-transition">
            <CheckoutLayout />
            <Footer />
        </div>
    );
};