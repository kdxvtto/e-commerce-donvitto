import { ShoppingBag, Users, Award, TrendingUp, Heart, Shield, Truck, Clock } from 'lucide-react';

// Halaman statis tentang perusahaan dengan tema gelap senada homepage
export const AboutLayout = () => {
  const stats = [
    { icon: Users, value: '100K+', label: 'Pelanggan Aktif' },
    { icon: ShoppingBag, value: '500K+', label: 'Produk Terjual' },
    { icon: Award, value: '50+', label: 'Brand Partner' },
    { icon: TrendingUp, value: '4.8/5', label: 'Rating Kepuasan' },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Kepuasan Pelanggan',
      description: 'Kami mengutamakan kepuasan pelanggan dengan pelayanan terbaik dan produk berkualitas tinggi.'
    },
    {
      icon: Shield,
      title: 'Terpercaya & Aman',
      description: 'Transaksi aman dengan keamanan berlapis dan garansi uang kembali.'
    },
    {
      icon: Truck,
      title: 'Pengiriman Cepat',
      description: 'Pengiriman ke seluruh Indonesia dengan jaminan tepat waktu atau gratis ongkir.'
    },
    {
      icon: Clock,
      title: 'Layanan 24/7',
      description: 'Customer service siap membantu kapan saja, di mana saja.'
    },
  ];

  const team = [
    {
      name: 'Budi Santoso',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      description: 'Visioner di balik ShopKu dengan pengalaman 15 tahun di industri e-commerce.'
    },
    {
      name: 'Siti Nurhaliza',
      role: 'Chief Marketing Officer',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      description: 'Ahli strategi pemasaran digital yang telah membantu ratusan brand berkembang.'
    },
    {
      name: 'Ahmad Wijaya',
      role: 'Chief Technology Officer',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      description: 'Tech enthusiast yang memastikan platform ShopKu selalu inovatif dan user-friendly.'
    },
    {
      name: 'Rina Kartika',
      role: 'Head of Customer Success',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      description: 'Berdedikasi memastikan setiap pelanggan mendapatkan pengalaman terbaik.'
    },
  ];

  const timeline = [
    { year: '2019', title: 'Awal Perjalanan', description: 'ShopKu didirikan dengan visi menjadi platform e-commerce terdepan di Indonesia.' },
    { year: '2020', title: 'Ekspansi Produk', description: 'Menambah lebih dari 10.000 produk dan 30 brand partner.' },
    { year: '2021', title: '50K Pengguna', description: 'Mencapai 50.000 pengguna aktif dengan rating 4.7/5.' },
    { year: '2022', title: 'Go National', description: 'Layanan ke seluruh Indonesia dengan 100+ mitra pengiriman.' },
    { year: '2023', title: 'Inovasi Mobile App', description: 'Aplikasi mobile diunduh lebih dari 200.000 kali.' },
    { year: '2024', title: 'Masa Depan', description: 'Terus berinovasi dengan AI dan personalisasi.' },
  ];

  return (
    <div className="min-h-screen relative text-white bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-900">
      {/* Hero Section */}
      <section className="bg-transparent text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">Tentang ShopKu</h1>
            <p className="text-xl leading-relaxed text-slate-200">
              Platform e-commerce terpercaya yang menghadirkan pengalaman belanja online terbaik dengan ribuan produk pilihan dan pelayanan prima untuk seluruh Indonesia.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/5 backdrop-blur border-t border-white/10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center bg-white/5 rounded-2xl p-6 border border-white/10 shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-500/20 rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-indigo-200" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">{stat.value}</h3>
                <p className="text-slate-200/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-transparent">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white/5 rounded-2xl p-8 shadow-lg border border-white/10">
              <div className="w-12 h-12 bg-indigo-500/20 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-indigo-200" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Visi Kami</h2>
              <p className="text-slate-200 leading-relaxed">
                Menjadi platform e-commerce nomor satu di Indonesia dengan teknologi terdepan, produk berkualitas, dan layanan pelanggan luar biasa.
              </p>
            </div>
            <div className="bg-white/5 rounded-2xl p-8 shadow-lg border border-white/10">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-purple-200" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Misi Kami</h2>
              <p className="text-slate-200 leading-relaxed">
                Memberdayakan pelanggan dengan pilihan produk terlengkap, harga terbaik, dan kemudahan berbelanja dari mana saja, sembari terus berinovasi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white/5 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Nilai-Nilai Kami</h2>
            <p className="text-slate-200 max-w-2xl mx-auto">
              Komitmen kami untuk memberikan yang terbaik bagi setiap pelanggan
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <div key={idx} className="text-center p-6 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-300/40 transition shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full mb-4">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                <p className="text-slate-200 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-transparent">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Perjalanan Kami</h2>
            <p className="text-slate-200">Dari startup hingga menjadi platform e-commerce terpercaya</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {timeline.map((item, idx) => (
              <div key={idx} className="bg-white/5 rounded-xl p-6 shadow-sm hover:shadow-lg transition border border-white/10">
                <div className="inline-block bg-indigo-600/80 text-white font-bold px-4 py-2 rounded-lg mb-4">
                  {item.year}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-slate-200 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white/5 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Tim Kami</h2>
            <p className="text-slate-200 max-w-2xl mx-auto">
              Bertemu dengan orang-orang hebat di balik kesuksesan ShopKu
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="text-center group bg-white/5 rounded-2xl p-4 border border-white/10 shadow">
                <div className="relative mb-4 overflow-hidden rounded-2xl">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
                <p className="text-cyan-200 font-medium mb-3">{member.role}</p>
                <p className="text-slate-200 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl text-center mx-auto">
            <h2 className="text-3xl font-bold mb-4">Siap Belanja di ShopKu?</h2>
            <p className="text-lg mb-8 text-slate-100">Dapatkan penawaran eksklusif, diskon menarik, dan pengalaman berbelanja terbaik hanya di ShopKu.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-6 py-3 bg-white text-slate-900 font-semibold rounded-full hover:bg-slate-100 transition">Mulai Belanja</button>
              <button className="px-6 py-3 border border-white text-white font-semibold rounded-full hover:bg-white/10 transition">Hubungi Kami</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
