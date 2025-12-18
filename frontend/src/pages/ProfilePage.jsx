import { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import { FaUserCircle } from 'react-icons/fa';

const ProfilePage = () => {
    const { user, logout } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '' // For UI check only
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: user.name || '',
                email: user.email || '',
                phoneNumber: user.phoneNumber || ''
            }));
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            if (formData.password && formData.password !== formData.confirmPassword) {
                setMessage('Password confirmation does not match');
                return;
            }

            await api.put('/auth/profile', {
                name: formData.name,
                email: formData.email,
                phoneNumber: formData.phoneNumber,
                password: formData.password || undefined
            });
            setMessage('Profile updated successfully!');
            // Ideally trigger a user refresh here
        } catch (error) {
            setMessage('Failed to update profile');
        }
    };

    return (
        <>
            <Navbar />
            <div className="page-container" style={{ paddingTop: '6rem' }}>
                <div className="glass-panel" style={{ width: '100%', maxWidth: '800px', display: 'flex', overflow: 'hidden' }}>

                    {/* Left Side: Avatar & Name */}
                    <div style={{ width: '30%', background: 'rgba(99, 102, 241, 0.1)', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <FaUserCircle size={100} color="#6366f1" />
                        <h3 style={{ marginTop: '1rem', textAlign: 'center' }}>{user?.name}</h3>
                        <button onClick={logout} style={{ marginTop: '2rem', background: 'transparent', border: '1px solid var(--error)', color: 'var(--error)', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer' }}>
                            Logout
                        </button>
                    </div>

                    {/* Right Side: Form */}
                    <div style={{ width: '70%', padding: '2rem' }}>
                        <h2 style={{ marginBottom: '1.5rem' }}>Profile Settings</h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Manage your personal information</p>

                        {message && <div style={{ color: 'var(--success)', marginBottom: '1rem' }}>{message}</div>}

                        <form onSubmit={handleSave} style={{ display: 'grid', gap: '1rem' }}>
                            <div>
                                <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Full Name</label>
                                <input name="name" className="input-field" value={formData.name} onChange={handleChange} />
                            </div>

                            <div>
                                <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Email Address</label>
                                <input name="email" className="input-field" value={formData.email} onChange={handleChange} />
                            </div>

                            <div>
                                <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Phone Number</label>
                                <input name="phoneNumber" className="input-field" value={formData.phoneNumber} onChange={handleChange} placeholder="+62..." />
                            </div>

                            <div>
                                <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Change Password</label>
                                <input name="password" type="password" className="input-field" value={formData.password} onChange={handleChange} placeholder="New Password" />
                            </div>

                            {formData.password && (
                                <div>
                                    <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Confirm Password</label>
                                    <input name="confirmPassword" type="password" className="input-field" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm New Password" />
                                </div>
                            )}

                            <div style={{ textAlign: 'right', marginTop: '1rem' }}>
                                <button type="submit" className="btn-primary">Save Changes</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </>
    );
};

export default ProfilePage;
