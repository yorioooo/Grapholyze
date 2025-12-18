import { useState, useRef, useContext } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CanvasDraw from 'react-canvas-draw';
import api from '../api/axios';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AnalystPage = () => {
    const { user } = useContext(AuthContext);
    const canvasRef = useRef(null);
    const [result, setResult] = useState(null);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [preview, setPreview] = useState(null);

    const [errorMessage, setErrorMessage] = useState(null);

    // 1. Handle File Upload
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        if (selectedFile) {
            setPreview(URL.createObjectURL(selectedFile));
            setErrorMessage(null); // Reset error on new file
        }
    };

    const handleUploadSubmit = async () => {
        if (!user) return navigate('/login');
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);
        await parseAndSend(formData);
    };

    // 2. Handle Canvas Submit
    const handleCanvasSubmit = async () => {
        if (!user) return navigate('/login');
        const dataUrl = canvasRef.current.getDataURL('image/png', false, 0xFFFFFFFF); // White background
        const blob = await (await fetch(dataUrl)).blob();
        const formData = new FormData();
        formData.append('image', blob, 'drawing.png');
        await parseAndSend(formData);
    };

    const parseAndSend = async (formData) => {
        setLoading(true);
        setErrorMessage(null);
        try {
            const { data } = await api.post('/tests/upload', formData); // Axios sets Content-Type automatically for FormData
            setResult(data); // Save result for display
        } catch (error) {
            console.error(error);
            const msg = error.response?.data?.message || error.message || 'Analysis failed';
            setErrorMessage(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: '#f3f4f6', paddingTop: '80px', fontFamily: "'Inter', sans-serif" }}>
            <Navbar />

            {/* Loading Overlay */}
            {loading && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    background: 'rgba(255,255,255,0.8)', zIndex: 1100,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                }}>
                    <div className="spinner" style={{
                        width: '50px', height: '50px', border: '5px solid #e2e8f0',
                        borderTopColor: '#6366f1', borderRadius: '50%', animation: 'spin 1s linear infinite'
                    }}></div>
                    <h2 style={{ marginTop: '1rem', color: '#1e293b', animation: 'pulse 1.5s infinite' }}>Analyzing Handwriting...</h2>
                    <p style={{ color: '#64748b' }}>Sedang menghubungkan ke AI Engine...</p>
                    <style>{`
                        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                        @keyframes pulse { 0% { opacity: 0.6; } 50% { opacity: 1; } 100% { opacity: 0.6; } }
                    `}</style>
                </div>
            )}

            {/* Error Modal Overlay */}
            {errorMessage && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    background: 'rgba(0,0,0,0.5)', zIndex: 1200,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', maxWidth: '400px', width: '90%', textAlign: 'center', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
                        <h3 style={{ color: '#ef4444', marginBottom: '0.5rem' }}>Analysis Failed</h3>
                        <p style={{ color: '#4b5563', marginBottom: '1.5rem', lineHeight: '1.5' }}>{errorMessage}</p>
                        <button
                            onClick={() => setErrorMessage(null)}
                            className="btn-primary"
                            style={{ background: '#ef4444', width: '100%' }}
                        >
                            Close & Retry
                        </button>
                    </div>
                </div>
            )}

            {/* Result Modal Overlay */}
            {result && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    background: 'rgba(0,0,0,0.5)', zIndex: 1000,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <div className="glass-panel" style={{ background: '#1e293b', padding: '2rem', maxWidth: '600px', width: '90%', maxHeight: '90vh', overflowY: 'auto', position: 'relative', border: '1px solid #6366f1' }}>
                        <button
                            onClick={() => setResult(null)}
                            style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'transparent', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer' }}
                        >
                            ×
                        </button>
                        <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '0.5rem' }}>Hasil Analisis</h2>
                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <h1 style={{ color: '#fbbf24', fontSize: '2.5rem', margin: '1rem 0' }}>{result.results.personalityType}</h1>
                            <p style={{ color: '#94a3b8' }}>Confidence: {(result.results.confidence * 100).toFixed(1)}%</p>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                            <button onClick={() => window.open(`http://localhost:5000/api/tests/${result._id}/pdf`, '_blank')} className="btn-primary" style={{ flex: 1, textAlign: 'center' }}>
                                Download PDF Laporan
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
                <h1 style={{ textAlign: 'center', color: '#111827', marginBottom: '3rem', fontSize: '2rem', fontWeight: 'bold' }}>Handwriting Analysis</h1>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>

                    {/* Card 1: Upload */}
                    <div style={{ background: 'white', borderRadius: '1rem', padding: '3rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', cursor: 'pointer', transition: 'transform 0.2s' }}
                        onClick={() => document.getElementById('fileInput').click()}>

                        <input id="fileInput" type="file" onChange={handleFileChange} accept="image/*" style={{ display: 'none' }} />

                        {preview ? (
                            <div style={{ textAlign: 'center', width: '100%' }}>
                                <img src={preview} alt="Upload Preview" style={{ maxHeight: '200px', maxWidth: '100%', objectFit: 'contain', marginBottom: '1rem' }} />
                                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                                    <button onClick={(e) => { e.stopPropagation(); handleUploadSubmit(); }} disabled={loading} className="btn-primary">
                                        {loading ? 'Analyzing...' : 'Analyze Now'}
                                    </button>
                                    <button onClick={(e) => { e.stopPropagation(); setFile(null); setPreview(null); }} style={{ padding: '0.5rem 1rem', border: '1px solid #e5e7eb', background: 'white', borderRadius: '0.5rem', cursor: 'pointer' }}>
                                        Change
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div style={{ fontSize: '4rem', color: '#9ca3af', marginBottom: '1rem' }}>🖼️</div>
                                <span style={{ color: '#6b7280', fontSize: '1.1rem', fontWeight: '500' }}>Upload Gambar Tulisan</span>
                            </>
                        )}
                    </div>

                    {/* Card 2: Draw */}
                    <div style={{ background: 'white', borderRadius: '1rem', padding: '2rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', minHeight: '300px' }}>
                        <h3 style={{ textAlign: 'center', color: '#6b7280', marginBottom: '1rem' }}>Handwriting</h3>
                        <div style={{ border: '2px solid #e5e7eb', borderRadius: '0.5rem', overflow: 'hidden', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                            <CanvasDraw
                                ref={canvasRef}
                                brushColor="#000"
                                brushRadius={2}
                                canvasWidth={400}
                                canvasHeight={200}
                                gridColor="rgba(0,0,0,0)"
                            />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <button onClick={() => canvasRef.current.clear()} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}>Clear</button>
                            <button onClick={handleCanvasSubmit} disabled={loading} className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                                {loading ? 'Analyzing...' : 'Analyze Drawing'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalystPage;
