import { FormLogin } from "../components/fragments/FormLogin";
import { AuthLayout } from "../components/Layouts/AuthLayout";

// Halaman login membungkus form dengan layout auth
export const LoginPage = () => {
    return (
        // Bungkus layout dengan kelas transisi untuk animasi perpindahan halaman
        <div className="page-transition">
            <AuthLayout title="Login" type="login">
                <FormLogin />
            </AuthLayout>
        </div>
    )
}
