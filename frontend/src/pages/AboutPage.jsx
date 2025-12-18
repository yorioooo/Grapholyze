import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutPage = () => {
    return (
        <>
            <Navbar />
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'white' }}>

                {/* Header */}
                <div style={{ paddingTop: '140px', paddingBottom: '80px', background: '#8b5cf6', textAlign: 'center', color: 'white' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>About Grapholyze</h1>
                    <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>Memahami kepribadian melalui tulisan tangan dengan teknologi AI</p>
                </div>

                <div style={{ padding: '60px 20px', maxWidth: '1100px', margin: '0 auto' }}>

                    {/* Intro Section */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', marginBottom: '80px', alignItems: 'center' }}>
                        <div>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: '#1e293b' }}>About Grapholyze</h2>
                            <p style={{ color: '#64748b', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                                Grapholyze adalah platform inovatif yang menggabungkan ilmu grafologi tradisional dengan teknologi AI modern untuk memberikan analisis kepribadian yang akurat melalui tulisan tangan.
                            </p>
                            <p style={{ color: '#64748b', lineHeight: '1.8', marginBottom: '2rem' }}>
                                Kami percaya setiap orang berhak memahami diri mereka lebih dalam, dan teknologi dapat membantu membuat ilmu grafologi lebih mudah diakses oleh semua orang.
                            </p>

                            {/* Stats */}
                            <div style={{ display: 'flex', gap: '3rem' }}>
                                <div>
                                    <div style={{ color: '#8b5cf6', fontWeight: 'bold', fontSize: '1.2rem' }}>95%</div>
                                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Akurasi</div>
                                </div>
                                <div>
                                    <div style={{ color: '#8b5cf6', fontWeight: 'bold', fontSize: '1.2rem' }}>24/7</div>
                                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Online</div>
                                </div>
                                <div>
                                    <div style={{ color: '#8b5cf6', fontWeight: 'bold', fontSize: '1.2rem' }}>1k+</div>
                                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Analisis</div>
                                </div>
                            </div>
                        </div>

                        {/* Quote Box */}
                        <div style={{ border: '1px solid #e2e8f0', borderRadius: '1rem', padding: '2rem', background: '#fff', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                            <p style={{ fontStyle: 'italic', color: '#475569', lineHeight: '1.6' }}>
                                "Grapholyze hadir dari keyakinan bahwa tulisan tangan menyimpan jejak kepribadian unik setiap individu. Dengan memadukan grafologi tradisional dan teknologi AI modern, kami ingin membuat analisis kepribadian menjadi lebih mudah, cepat, dan dapat diakses oleh semua orang."
                            </p>
                        </div>
                    </div>

                    {/* Mission Vision */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '100px' }}>
                        <div style={{ padding: '2.5rem', background: '#f8fafc', borderRadius: '1rem' }}>
                            <h3 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.5rem', color: '#1e293b' }}>Misi Kami</h3>
                            <p style={{ color: '#64748b', marginBottom: '1.5rem', textAlign: 'center' }}>
                                Menghadirkan teknologi AI yang membantu setiap individu memahami kepribadian mereka melalui analisis tulisan tangan akurat dan mudah digunakan.
                            </p>
                            <ul style={{ listStyle: 'none', padding: 0, color: '#64748b' }}>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                    <span style={{ color: '#8b5cf6' }}>✓</span> Teknologi mudah digunakan
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ color: '#8b5cf6' }}>✓</span> Hasil akurat dan bermakna
                                </li>
                            </ul>
                        </div>

                        <div style={{ padding: '2.5rem', background: '#f8fafc', borderRadius: '1rem' }}>
                            <h3 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.5rem', color: '#1e293b' }}>Visi Kami</h3>
                            <p style={{ color: '#64748b', marginBottom: '1.5rem', textAlign: 'center' }}>
                                Menjadi platform AI terdepan untuk analisis tulisan tangan dan pemahaman kepribadian, membantu jutaan orang dalam perjalanan self-discovery mereka.
                            </p>
                            <ul style={{ listStyle: 'none', padding: 0, color: '#64748b' }}>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                    <span style={{ color: '#8b5cf6' }}>★</span> Leader dalam grafologi
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ color: '#8b5cf6' }}>★</span> Inovasi berkelanjutan
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Technology */}
                    <div style={{ textAlign: 'center', marginBottom: '100px' }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#1e293b' }}>Teknologi Kami</h2>
                        <p style={{ color: '#64748b', marginBottom: '3rem' }}>Menggunakan AI dan machine learning terdepan</p>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', flexWrap: 'wrap' }}>
                            <TechCircle color="#93c5fd" title="Computer Vision" desc="Analisi visual dengan akurasi tinggi" />
                            <TechCircle color="#86efac" title="Deep Learning" desc="Neural networks untuk pattern recognition" />
                            <TechCircle color="#d8b4fe" title="Security" desc="Enkripsi untuk melindungi data" />
                            <TechCircle color="#c4b5fd" title="Machine Learning" desc="Algoritma pembelajaran berkelanjutan" />
                        </div>
                    </div>

                </div>

                {/* CTA Section */}
                <div style={{ padding: '80px 20px', background: '#8b5cf6', textAlign: 'center', color: 'white' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Siap Memulai?</h2>
                    <p style={{ marginBottom: '2rem', opacity: 0.9 }}>Tentukan kepribadian Anda melalui analisis tulisan tangan dengan AI</p>
                    <Link to="/analyst" className="btn-primary" style={{ background: 'white', color: '#8b5cf6', fontSize: '1.1rem', padding: '1rem 3rem' }}>
                        Mulai Analisis
                    </Link>
                </div>

                <Footer />
            </div>
        </>
    );
};

const TechCircle = ({ color, title, desc }) => (
    <div style={{ textAlign: 'center', maxWidth: '200px' }}>
        <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: color, margin: '0 auto 1.5rem' }}></div>
        <h4 style={{ color: '#1e293b', marginBottom: '0.5rem' }}>{title}</h4>
        <p style={{ fontSize: '0.9rem', color: '#64748b' }}>{desc}</p>
    </div>
);

export default AboutPage;
