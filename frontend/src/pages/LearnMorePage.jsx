import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const LearnMorePage = () => {
    return (
        <>
            <Navbar />
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'white' }}>

                {/* Header */}
                <div style={{ paddingTop: '140px', paddingBottom: '80px', background: '#8b5cf6', textAlign: 'center', color: 'white' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Pelajari Lebih Lanjut</h1>
                    <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>Kenali tulisan tangan Anda dengan kecerdasan buatan.</p>
                </div>

                <div style={{ padding: '60px 20px', maxWidth: '900px', margin: '0 auto' }}>

                    {/* Intro Box */}
                    <div style={{ border: '1px solid #e2e8f0', borderRadius: '1rem', padding: '2rem', textAlign: 'center', marginBottom: '4rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                        <p style={{ fontSize: '1.1rem', color: '#475569', fontStyle: 'italic', maxWidth: '600px', margin: '0 auto' }}>
                            Graphology AI adalah aplikasi analisis tulisan tangan berbasis web yang membantu Anda memahami karakter, emosi, dan pola kepribadian hanya dari goresan pena.
                        </p>
                    </div>

                    {/* How To Use */}
                    <div style={{ marginBottom: '4rem' }}>
                        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                            <span style={{ background: '#8b5cf6', color: 'white', padding: '0.75rem 2rem', borderRadius: '2rem', fontWeight: 'bold', letterSpacing: '1px' }}>
                                CARA MENGGUNAKAN APLIKASI
                            </span>
                        </div>

                        <div style={{ display: 'grid', gap: '2rem' }}>
                            <StepItem
                                number="1"
                                title="Registrasi & Login"
                                desc="Buat akun baru atau login untuk memulai pengalaman analisis tulisan tangan."
                            />
                            <StepItem
                                number="2"
                                title="Dashboard (Home)"
                                desc="Setelah berhasil login, Anda akan diarahkan ke dashboard utama. Di sini tersedia menu navigasi ke semua fitur."
                            />
                            <StepItem
                                number="3"
                                title="Handwriting Analyst (Fitur Utama)"
                                descCustom={
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#475569' }}>
                                        <li>- Upload Tulisan → Unggah foto tulisan tangan Anda.</li>
                                        <li>- Tulis Langsung → Gunakan canvas digital untuk menulis langsung di aplikasi.</li>
                                        <li>Hasil analisis akan ditampilkan secara otomatis dalam bentuk laporan singkat.</li>
                                    </ul>
                                }
                            />
                            <StepItem
                                number="4"
                                title="About"
                                desc="Halaman ini memberikan informasi lengkap tentang tujuan, teknologi, dan manfaat aplikasi Graphology AI."
                            />
                        </div>
                    </div>

                    {/* Summary Gradient Box */}
                    <div style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)', borderRadius: '1rem', padding: '2rem', color: 'white', marginBottom: '6rem' }}>
                        <ol style={{ paddingLeft: '20px', margin: 0, lineHeight: '2' }}>
                            <li><b>Analisis Tulisan Instan</b> → Dapatkan hasil cepat dan akurat dari tulisan Anda.</li>
                            <li><b>Dua Metode Input</b> → Upload tulisan tangan atau tulis langsung di aplikasi.</li>
                            <li><b>Dashboard Ringkas</b> → Navigasi mudah ke semua fitur.</li>
                            <li><b>Tentang Aplikasi</b> → Kenali lebih dalam fungsi dan manfaat Graphology AI.</li>
                        </ol>
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

const StepItem = ({ number, title, desc, descCustom }) => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
        <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#1e293b' }}>{number}.</div>
        <div>
            <h4 style={{ fontSize: '1.1rem', color: '#1e293b', marginBottom: '0.25rem' }}>{title}</h4>
            {desc && <p style={{ color: '#475569', lineHeight: '1.5', margin: 0 }}>{desc}</p>}
            {descCustom}
        </div>
    </div>
);

export default LearnMorePage;
