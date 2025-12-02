import { FormRegister } from "../components/fragments/FormRegister";
import { AuthLayout } from "../components/Layouts/AuthLayout";

// Halaman register membungkus FormRegister dengan AuthLayout
export const RegisterPage = () => {
    return (
        // Tambahkan kelas transisi agar halaman muncul dengan animasi
        <div className="page-transition">
            <AuthLayout title="Register" type="register">
                <FormRegister />
            </AuthLayout>
        </div>
    )
}
