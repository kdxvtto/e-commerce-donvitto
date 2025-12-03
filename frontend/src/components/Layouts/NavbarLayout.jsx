import { ShoppingCart, Search, Menu, User } from 'lucide-react';
import { Input } from '../elements/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectAuth, fetchProfile } from '../../redux/slice/loginSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const NavbarLayout = () => {
  // Ambil status auth untuk mengatur tombol login/logout
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, profile } = useSelector(selectAuth);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  // Ambil total item di keranjang dari Redux
  const totalQuantity = useSelector(state => state.cart.cartTotalQuantity ?? 0);

  // Pastikan profil di-load setelah login, supaya alamat/nama bisa dipakai di halaman lain
  useEffect(() => {
    if (isAuthenticated && !profile) {
      dispatch(fetchProfile());
    }
  }, [isAuthenticated, profile, dispatch]);

  // Logout user, bersihkan token, dan arahkan ke halaman login
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login', { replace: true });
  };

    return (
        <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur border-b border-white/10 text-white">
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                <div className="flex items-center space-x-8">
                    {/* Gunakan Link agar navigasi SPA tanpa reload */}
                    <Link to="/" className="text-2xl font-bold tracking-tight">
                        <span className="text-cyan-300">Don</span> <span className="text-indigo-200">Vitto</span>
                    </Link>
                    <nav className="hidden md:flex space-x-6">
                    <Link to="/" className="text-slate-200 hover:text-white transition">Beranda</Link>
                    <Link to="/product" className="text-slate-200 hover:text-white transition">Produk</Link>
                    <Link to="/about" className="text-slate-200 hover:text-white transition">Tentang</Link>
                    </nav>
                </div>
                
                <div className="flex items-center space-x-4">
                    <div className="hidden md:flex items-center bg-white/10 border border-white/10 rounded-full px-4 py-2 backdrop-blur">
                    <Search className="w-5 h-5 text-slate-200 mr-3" />
                    <Input placeholder="Cari produk..." className="ml-2 w-64 bg-transparent text-white placeholder:text-slate-300 border-0 focus:ring-0" />
                    </div>

                    {isAuthenticated ? (
                      <button
                        className="hidden md:inline-flex px-4 py-2 rounded-full bg-rose-500/80 text-white text-sm font-semibold hover:bg-rose-400/80 transition-colors border border-white/10"
                        onClick={handleLogout}
                        disabled={loading}
                      >
                        {loading ? "..." : "Logout"}
                      </button>
                    ) : (
                      <Link
                        to="/login"
                        className="hidden md:inline-flex px-4 py-2 rounded-full bg-indigo-500/80 text-white text-sm font-semibold hover:bg-indigo-400/80 transition-colors border border-white/10"
                      >
                        Masuk
                      </Link>
                    )}
                    
                    {/* User dropdown */}
                    <div className="relative hidden md:block">
                      <button
                        className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition"
                        onClick={() => setIsUserMenuOpen((prev) => !prev)}
                      >
                        <User className="w-5 h-5 text-slate-200" />
                        <span className="text-sm text-slate-100">
                          {profile?.name || 'Guest'}
                        </span>
                      </button>
                      {isUserMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-slate-900/90 border border-white/10 rounded-xl shadow-xl backdrop-blur z-50">
                          <div className="px-4 py-3 border-b border-white/10">
                            <p className="text-sm text-slate-200 font-semibold">
                              {profile?.name || 'Guest'}
                            </p>
                            <p className="text-xs text-slate-400">
                              {profile?.email || 'Belum login'}
                            </p>
                          </div>
                          {isAuthenticated ? (
                            <button
                              onClick={handleLogout}
                              disabled={loading}
                              className="w-full text-left px-4 py-3 text-sm text-rose-200 hover:bg-rose-500/10"
                            >
                              {loading ? '...' : 'Logout'}
                            </button>
                          ) : (
                            <Link
                              to="/login"
                              className="block px-4 py-3 text-sm text-indigo-200 hover:bg-indigo-500/10"
                            >
                              Masuk
                            </Link>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <Link
                      to="/checkout"
                      className="p-2 hover:bg-white/10 rounded-full relative transition"
                      aria-label="Buka keranjang/checkout"
                    >
                      <ShoppingCart className="w-6 h-6 text-slate-200" />
                      {totalQuantity > 0 && (
                        <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {totalQuantity}
                        </span>
                      )}
                    </Link>
                    
                    <button className="md:hidden">
                    <Menu className="w-6 h-6" />
                    </button>
                </div>
                </div>
             </div>
            </header>
  );
};
