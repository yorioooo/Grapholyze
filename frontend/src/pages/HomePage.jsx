import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBolt, FaLock, FaBrain } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HomePage = () => {
    return (
        <>
            <Navbar />
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

                {/* Hero Section */}
                <section style={{
                    padding: '160px 40px 100px',
                    background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                    minHeight: '600px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    color: 'white'
                }}>
                    <div style={{ maxWidth: '600px' }}>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{ fontSize: '3.5rem', fontWeight: 'bold', lineHeight: '1.2', marginBottom: '1.5rem' }}
                        >
                            Analisis Tulisan Tangan dengan <span style={{ color: '#fbbf24' }}>Kecerdasan Buatan</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            style={{ fontSize: '1.1rem', marginBottom: '2.5rem', opacity: 0.9 }}
                        >
                            Temukan kepribadian dan karakter kalian melalui analisis grafologi yang didukung AI canggih.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            style={{ display: 'flex', gap: '1rem' }}
                        >
                            <Link to="/analyst" className="btn-primary" style={{ background: 'white', color: '#6366f1', fontSize: '1.1rem' }}>
                                Mulai Analisis
                            </Link>
                            <Link to="/learn-more" style={{ padding: '0.75rem 1.5rem', border: '1px solid white', borderRadius: '0.5rem', color: 'white', fontWeight: 'bold' }}>
                                Pelajari Lebih Lanjut
                            </Link>
                        </motion.div>
                    </div>

                    {/* Hero Image Placeholder - Using a generic tech illustration if real one not available */}
                    <div style={{ width: '40%', height: '400px', background: 'rgba(255,255,255,0.1)', borderRadius: '2rem', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {/* Imagine a cool 3D Robot Image here */}
                        <FaBrain size={150} color="rgba(255,255,255,0.2)" />
                    </div>
                </section>

                {/* Features Section */}
                <section style={{ padding: '80px 40px', background: 'white' }}>
                    <h2 style={{ textAlign: 'center', color: '#1e293b', marginBottom: '60px', fontSize: '2rem' }}>Mengapa Pilih Grapholyze?</h2>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', flexWrap: 'wrap' }}>
                        <FeatureCard icon={<FaBolt />} title="Cepat & Akurat" desc="Hasil analisis dalam hitungan detik dengan akurasi tinggi." color="#60a5fa" />
                        <FeatureCard icon={<FaLock />} title="Aman & Privat" desc="Data Anda terlindungi dengan enkripsi tingkat enterprise." color="#4ade80" />
                        <FeatureCard icon={<FaBrain />} title="Berbasis Sains" desc="Menggabungkan grafologi klasik dengan deep learning modern." color="#c084fc" />
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
};

const FeatureCard = ({ icon, title, desc, color }) => (
    <div style={{ textAlign: 'center', maxWidth: '300px' }}>
        <div style={{
            width: '80px', height: '80px', borderRadius: '50%', background: color, margin: '0 auto 1.5rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '2rem'
        }}>
            {icon}
        </div>
        <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>{title}</h3>
        <p style={{ color: '#64748b', lineHeight: '1.6' }}>{desc}</p>
    </div>
);

export default HomePage;
