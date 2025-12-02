import { Link } from "react-router-dom";

// Kerangka halaman login/register dengan tema gelap yang selaras halaman lain
export const AuthLayout = ({ type = "login", children, title }) => {

  const isLogin = type.toLowerCase() === "login";

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-4 py-10 text-slate-100 overflow-hidden">
      {/* Layer background gradasi dan glow agar seragam dengan halaman produk */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 pointer-events-none" />
      <div className="absolute inset-0 opacity-45 bg-[radial-gradient(circle_at_20%_20%,#6366f1_0,transparent_25%),radial-gradient(circle_at_80%_0%,#22d3ee_0,transparent_22%),radial-gradient(circle_at_20%_80%,#818cf8_0,transparent_22%)] pointer-events-none" />
      <div className="absolute -left-24 -bottom-32 w-80 h-80 bg-indigo-500/20 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -right-24 -top-32 w-80 h-80 bg-cyan-400/20 blur-3xl rounded-full pointer-events-none" />

      {/* Kartu utama dengan efek kaca */}
      <div className="relative z-10 w-full max-w-md bg-slate-900/70 border border-white/10 shadow-2xl rounded-2xl p-8 backdrop-blur-xl">

        {/* Title */}
        {title && (
          <h1 className="text-3xl font-semibold text-slate-50 mb-2 text-center">
            {title}
          </h1>
        )}

        {/* Subtitle fix — sekarang subtitle tidak pakai type lagi */}
        <p className="text-slate-300 text-sm text-center mb-8">
          {isLogin ? "Login to your account" : "Create your account"}
        </p>

        {children}

        <p className="text-sm mt-6 text-center text-slate-300">
          {isLogin ? "Don't have an account? " : "Have an account? "}
          <Link 
            to={isLogin ? "/register" : "/login"} 
            className="font-semibold text-indigo-300 hover:text-indigo-200 transition-colors"
          >
            {isLogin ? "Sign Up" : "Login"}
          </Link>
        </p>

      </div>
    </div>
  );
};
