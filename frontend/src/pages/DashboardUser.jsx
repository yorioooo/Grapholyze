import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import api from '../api/axios';
import { motion } from 'framer-motion';

const DashboardUser = () => {
    const { user, logout } = useContext(AuthContext);
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [results, setResults] = useState([]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return;
        setUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            await api.post('/tests/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            fetchResults(); // Refresh list
            setFile(null);
        } catch (error) {
            alert('Upload failed');
        } finally {
            setUploading(false);
        }
    };

    const fetchResults = async () => {
        try {
            const { data } = await api.get('/tests/mytests');
            setResults(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchResults();
    }, []);

    return (
        <div className="page-container" style={{ alignItems: 'flex-start' }}>
            <header style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Grapholyze</h1>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <span>Hello, {user?.name}</span>
                    <button onClick={logout} className="btn-primary" style={{ background: 'transparent', border: '1px solid var(--primary)' }}>Logout</button>
                </div>
            </header>

            <main style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
                {/* Upload Section */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass-panel" style={{ padding: '2rem' }}>
                    <h2 style={{ marginBottom: '1rem' }}>New Analysis</h2>
                    <div style={{ border: '2px dashed var(--text-muted)', padding: '2rem', borderRadius: '1rem', textAlign: 'center', marginBottom: '1rem' }}>
                        <input type="file" onChange={handleFileChange} accept="image/*" style={{ display: 'none' }} id="file-upload" />
                        <label htmlFor="file-upload" className="btn-primary" style={{ display: 'inline-block', marginBottom: '1rem' }}>
                            Choose Image
                        </label>
                        {file && <p>{file.name}</p>}
                    </div>
                    <button onClick={handleUpload} disabled={!file || uploading} className="btn-primary" style={{ width: '100%' }}>
                        {uploading ? 'Analyzing...' : 'Start Analysis'}
                    </button>
                </motion.div>

                {/* Results Section */}
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <h2 style={{ marginBottom: '1rem' }}>History</h2>
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {results.map((res) => (
                            <div key={res._id} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <h3 style={{ margin: 0, color: 'var(--secondary)' }}>{res.results?.personalityType}</h3>
                                    <p style={{ margin: '0.5rem 0 0', color: 'var(--text-muted)' }}>Confidence: {Math.round(res.results?.confidence * 100)}%</p>
                                </div>
                                <div>
                                    {/* PDF Download Button Placeholder */}
                                    <button className="btn-primary" onClick={() => window.open(`http://localhost:5000/api/tests/${res._id}/pdf`, '_blank')}>Download PDF</button>
                                </div>
                            </div>
                        ))}
                        {results.length === 0 && <p className="glass-panel" style={{ padding: '1rem' }}>No history yet.</p>}
                    </div>
                </motion.div>
            </main>
        </div>
    );
};

export default DashboardUser;
