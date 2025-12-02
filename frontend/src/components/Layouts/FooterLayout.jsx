export const Footer = () => (
  <footer className="mt-16 bg-slate-900 text-white relative overflow-hidden">
    <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_20%_20%,#6366f1_0,transparent_25%),radial-gradient(circle_at_80%_0%,#22d3ee_0,transparent_22%),radial-gradient(circle_at_20%_80%,#818cf8_0,transparent_22%)]" />
    <div className="relative max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h4 className="text-xl font-bold mb-4">Don Vitto</h4>
          <p className="text-slate-200/90">Platform belanja online terpercaya dengan berbagai produk berkualitas.</p>
          <div className="flex gap-3 mt-4 text-slate-200/80">
            <a href="#" className="hover:text-white">Instagram</a>
            <a href="#" className="hover:text-white">Twitter</a>
            <a href="#" className="hover:text-white">Facebook</a>
          </div>
        </div>
        <div>
          <h5 className="font-semibold mb-4">Tentang Kami</h5>
          <ul className="space-y-2 text-slate-200/80">
            <li><a href="#" className="hover:text-white">Tentang Don Vitto</a></li>
            <li><a href="#" className="hover:text-white">Karir</a></li>
            <li><a href="#" className="hover:text-white">Blog</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold mb-4">Layanan</h5>
          <ul className="space-y-2 text-slate-200/80">
            <li><a href="#" className="hover:text-white">Bantuan</a></li>
            <li><a href="#" className="hover:text-white">Pengiriman</a></li>
            <li><a href="#" className="hover:text-white">Pengembalian</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold mb-4">Hubungi Kami</h5>
          <ul className="space-y-2 text-slate-200/80">
            <li>Email: donvitto@gmail.com</li>
            <li>Telepon: 0800-123-4567</li>
            <li>Jam: 09:00 - 18:00 WIB</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 mt-8 pt-8 text-center text-slate-200/80">
        <p>&copy; 2024 Don Vitto. Semua hak dilindungi.</p>
      </div>
    </div>
  </footer>
);
