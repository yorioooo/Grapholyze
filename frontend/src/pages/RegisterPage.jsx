import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { motion } from 'framer-motion';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        age: '',
        gender: 'Laki-laki',
        education: '',
        dominant_hand: 'Kanan'
    });

    const { register } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            console.log("Sending Data:", formData);
            await register(formData);
            navigate('/');
        } catch (err) {
            console.error("Register Error:", err);
            let errMsg = 'Registration failed';

            if (err.response) {
                // Server responded with a status code explicitly
                if (err.response.status === 400) {
                    errMsg = 'Registrasi Gagal: Email sudah terdaftar atau data tidak lengkap.';
                } else {
                    errMsg = `Server Error (${err.response.status}): ${err.response.data?.message}`;
                }
            } else if (err.request) {
                // Request was made but no response
                errMsg = 'Gagal menghubungi server. Pastikan backend menyala.';
            } else {
                errMsg = err.message;
            }
            setError(errMsg);
        }
    };

    return (
        <div className="page-container" style={{ padding: '2rem 1rem' }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-panel"
                style={{ padding: '2rem', width: '100%', maxWidth: '500px' }}
            >
                <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.8rem' }}>Create Account</h2>

                {error && <div style={{ color: 'var(--error)', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
                    <input name="name" placeholder="Full Name" className="input-field" onChange={handleChange} required />
                    <input name="email" type="email" placeholder="Email Address" className="input-field" onChange={handleChange} required />
                    <input name="password" type="password" placeholder="Password" className="input-field" onChange={handleChange} required />

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <input name="age" type="number" placeholder="Age" className="input-field" onChange={handleChange} />
                        <select name="gender" className="input-field" onChange={handleChange} style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)' }}>
                            <option value="Laki-laki">Male</option>
                            <option value="Perempuan">Female</option>
                        </select>
                    </div>

                    <input name="education" placeholder="Last Education" className="input-field" onChange={handleChange} />

                    <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem' }}>
                        Register
                    </button>
                </form>

                <p style={{ marginTop: '1rem', textAlign: 'center' }}>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default RegisterPage;
