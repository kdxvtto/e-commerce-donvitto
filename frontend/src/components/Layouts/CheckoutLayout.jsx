import { useState, useMemo, useEffect } from 'react';
import { 
  MapPin, Truck, CreditCard, Wallet, Building2, 
  ChevronRight, ShoppingBag, Tag, AlertCircle, Check, Edit2
} from 'lucide-react';
import { usePaymentMethods } from '../../hooks/payment';
import { useShippingMethods } from '../../hooks/shipping';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProfile, selectAuth } from '../../redux/slice/loginSlice';

export const CheckoutLayout = () => {
  const [selectedShipping, setSelectedShipping] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('');
  const dispatch = useDispatch();

  // Ambil metode pembayaran dari backend (via hook)
  const { methods: paymentMethods, loading: loadingPayment, error: errorPayment } = usePaymentMethods();
  // Ambil metode pengiriman dari backend (via hook)
  const { methods: shippingMethods, loading: loadingShipping, error: errorShipping } = useShippingMethods();
  // Ambil cart dari Redux
  const cartItems = useSelector((state) => state.cart.cartItems ?? []);
  // Ambil profil user dari Redux (pastikan fetchProfile dipanggil setelah login)
  const profile = useSelector((state) => state.auth.profile);
  const { isAuthenticated } = useSelector(selectAuth);
  const navigate = useNavigate();

  // Pastikan profil sudah dimuat setelah login (sekali saja)
  useEffect(() => {
    if (isAuthenticated && !profile) {
      dispatch(fetchProfile()); // isi profil dari backend jika belum ada
    }
  }, [isAuthenticated, profile, dispatch]);

  // Pilihan pengiriman aktif: pakai pilihan user, fallback ke metode pertama yang tersedia
  const activeShipping = useMemo(
    () => selectedShipping || (shippingMethods[0]?.code ?? ''),
    [selectedShipping, shippingMethods]
  );

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCost = shippingMethods.find(opt => opt.code === activeShipping)?.price || 0;
  const discount = 0; // untuk sementara, tidak pakai voucher di checkout
  const total = subtotal + shippingCost - discount;

  // Derive info pengiriman dari profil (fallback ke email jika phone tidak ada)
  const displayName = profile?.name || profile?.email || "Nama belum ada";
  const displayPhone = profile?.phone || profile?.email || "Nomor belum ada";
  const displayAddress = profile?.address || "Alamat belum diisi";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-900 text-white">
      {/* Header */}
      <header className="bg-slate-900/60 backdrop-blur border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-indigo-200">Don Vitto</h1>
            <div className="flex items-center gap-3 text-sm text-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center font-semibold">
                  1
                </div>
                <span className="font-medium text-white">Checkout</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
              <div className="flex items-center gap-2 text-slate-300">
                <div className="w-8 h-8 bg-slate-700 text-white rounded-full flex items-center justify-center font-semibold">
                  2
                </div>
                <span className="text-slate-300">Pembayaran</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
              <div className="flex items-center gap-2 text-slate-400">
                <div className="w-8 h-8 bg-slate-700 text-white rounded-full flex items-center justify-center font-semibold">
                  3
                </div>
                <span className="text-slate-400">Selesai</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address */}
            <div className="bg-white/5 border border-white/10 rounded-xl shadow-lg p-6 backdrop-blur">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-indigo-300" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">Alamat Pengiriman</h2>
                    <p className="text-sm text-slate-300">Pilih atau tambah alamat pengiriman</p>
                  </div>
                </div>
                <button className="text-indigo-300 hover:text-indigo-200 text-sm font-medium flex items-center gap-1">
                  <Edit2 className="w-4 h-4" />
                  Ubah
                </button>
              </div>

              <div className="border border-indigo-400/60 rounded-lg p-4 bg-indigo-500/10">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-white">{displayName}</p>
                    <p className="text-sm text-slate-200">{displayPhone}</p>
                  </div>
                  <span className="bg-indigo-500 text-white text-xs font-semibold px-2 py-1 rounded">
                    Utama
                  </span>
                </div>
                <p className="text-sm text-slate-100 leading-relaxed">
                  {displayAddress}
                </p>
              </div>

              <button
                className="mt-4 text-indigo-300 hover:text-indigo-200 text-sm font-medium"
                onClick={() => navigate('/profile/address')}
              >
                + Tambah Alamat Baru
              </button>
            </div>

            {/* Shipping Method */}
            <div className="bg-white/5 border border-white/10 rounded-xl shadow-lg p-6 backdrop-blur">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <Truck className="w-5 h-5 text-emerald-300" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Metode Pengiriman</h2>
                  <p className="text-sm text-slate-300">Pilih layanan pengiriman yang tersedia</p>
                </div>
              </div>

              <div className="space-y-3">
                {errorShipping && (
                  <div className="flex items-center gap-2 p-3 bg-rose-500/10 border border-rose-400/40 rounded-lg mb-2 text-sm text-rose-100">
                    Gagal memuat metode pengiriman: {errorShipping}
                  </div>
                )}
                {loadingShipping && (
                  <div className="p-3 bg-slate-800/50 rounded-lg text-sm text-slate-200">Memuat metode...</div>
                )}
                {!loadingShipping && !errorShipping && shippingMethods.map((option) => (
                  <label
                    key={option.code}
                    className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition ${
                      activeShipping === option.code
                        ? 'border-emerald-400 bg-emerald-500/10'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        value={option.code}
                        checked={activeShipping === option.code}
                        onChange={(e) => setSelectedShipping(e.target.value)}
                        className="w-5 h-5 text-emerald-300 bg-transparent"
                      />
                      <div>
                        <p className="font-semibold text-white">{option.name}</p>
                        <p className="text-sm text-slate-200">Estimasi: {option.eta || option.description}</p>
                      </div>
                    </div>
                    <p className="font-bold text-indigo-200">{formatPrice(option.price)}</p>
                  </label>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white/5 border border-white/10 rounded-xl shadow-lg p-6 backdrop-blur">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-purple-300" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Metode Pembayaran</h2>
                  <p className="text-sm text-slate-300">Pilih metode pembayaran yang diinginkan</p>
                </div>
              </div>

              {!selectedPayment && (
                <div className="flex items-center gap-2 p-3 bg-amber-500/10 border border-amber-300/50 rounded-lg mb-4">
                  <AlertCircle className="w-5 h-5 text-amber-300 flex-shrink-0" />
                  <p className="text-sm text-amber-100">Pilih metode pembayaran untuk melanjutkan</p>
                </div>
              )}

              <div className="space-y-3">
                {errorPayment && (
                  <div className="flex items-center gap-2 p-3 bg-rose-500/10 border border-rose-400/40 rounded-lg mb-2 text-sm text-rose-100">
                    Gagal memuat metode pembayaran: {errorPayment}
                  </div>
                )}
                {loadingPayment && (
                  <div className="p-3 bg-slate-800/50 rounded-lg text-sm text-slate-200">Memuat metode...</div>
                )}
                {!loadingPayment && !errorPayment && paymentMethods.map((method) => (
                  <label
                    key={method.id || method._id || method.code}
                    className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition ${
                      selectedPayment === (method.id || method._id || method.code)
                        ? 'border-purple-400 bg-purple-500/10'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        value={method.id || method._id || method.code}
                        checked={selectedPayment === (method.id || method._id || method.code)}
                        onChange={(e) => setSelectedPayment(e.target.value)}
                        className="w-5 h-5 text-purple-300 bg-transparent"
                      />
                      <div>
                        <p className="font-semibold text-white">{method.name}</p>
                        <p className="text-sm text-slate-200">{method.description}</p>
                      </div>
                    </div>
                    {selectedPayment === (method.id || method._id || method.code) && (
                      <Check className="w-5 h-5 text-purple-300" />
                    )}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 border border-white/10 rounded-xl shadow-lg p-6 sticky top-24 backdrop-blur">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-indigo-200" />
                Ringkasan Pesanan
              </h3>

              {/* Cart Items */}
              <div className="space-y-4 mb-4 pb-4 border-b border-white/10">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-white line-clamp-2 mb-1">
                        {item.name}
                      </p>
                      <p className="text-xs text-slate-200 mb-1">{item.variant}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-300">x{item.quantity}</p>
                        <p className="font-bold text-sm text-indigo-100">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Details */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-200">Subtotal ({cartItems.length} produk)</span>
                  <span className="font-semibold text-white">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-200">Ongkos Kirim</span>
                  <span className="font-semibold text-white">{formatPrice(shippingCost)}</span>
                </div>
                {/* Diskon voucher dihilangkan sementara; gunakan diskon produk jika ada */}
                <div className="border-t border-white/10 pt-3 flex items-center justify-between">
                  <span className="font-bold text-white">Total Pembayaran</span>
                  <span className="font-bold text-2xl text-indigo-200">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                disabled={!selectedPayment}
                className={`w-full py-4 rounded-xl font-bold text-white transition ${
                  selectedPayment
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700'
                    : 'bg-slate-600 cursor-not-allowed'
                }`}
              >
                {selectedPayment ? 'Bayar Sekarang' : 'Pilih Metode Pembayaran'}
              </button>

              <p className="text-xs text-slate-300 text-center mt-4">
                Dengan melakukan pembayaran, Anda menyetujui{' '}
                <a href="#" className="text-indigo-200 hover:underline">Syarat & Ketentuan</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
