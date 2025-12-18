import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer style={{ background: 'black', padding: '3rem 2rem', marginTop: 'auto', width: '100%', borderTop: '1px solid #333' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem' }}>
                <div>
                    <h3 style={{ color: 'white', marginBottom: '1rem' }}>Grapholyze</h3>
                    <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: '1.6' }}>
                        Platform AI terdepan untuk analisis tulisan tangan dan kepribadian.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <FaFacebook color="#888" />
                        <FaLinkedin color="#888" />
                        <FaYoutube color="#888" />
                        <FaInstagram color="#888" />
                    </div>
                </div>

                <div>
                    <h4 style={{ color: 'white', marginBottom: '1rem' }}>Menu</h4>
                    <ul style={{ listStyle: 'none', padding: 0, color: '#888', fontSize: '0.9rem', display: 'grid', gap: '0.5rem' }}>
                        <li>Handwriting Analysis</li>
                        <li>Personality Report</li>
                        <li>API Integration</li>
                    </ul>
                </div>

                <div>
                    <h4 style={{ color: 'white', marginBottom: '1rem' }}>Kontak</h4>
                    <p style={{ color: '#888', fontSize: '0.9rem' }}>admin@grapholyze.id</p>
                </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '3rem', color: '#444', fontSize: '0.8rem' }}>
                2025 Grapholyze All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
