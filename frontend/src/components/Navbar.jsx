import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <nav style={{
            width: '100%',
            padding: '1rem 2rem',
            display: 'flex', // Flexbox for layout
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 100,
            background: 'white', // White background
            borderBottom: '1px solid #e2e8f0', // Light gray border
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
        }}>
            <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1e293b', textDecoration: 'none' }}>
                Grapholyze
            </Link>

            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                <Link to="/" style={{ color: '#64748b', fontWeight: '500' }}>Home</Link>
                <Link to="/analyst" style={{ color: '#64748b', fontWeight: '500' }}>Handwriting Analyst</Link>
                <Link to="/about" style={{ color: '#64748b', fontWeight: '500' }}>About</Link>

                {user ? (
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#1e293b' }}>
                            <FaUserCircle size={28} color="#475569" />
                            {/* <span>Profile</span> Link text removed for cleaner look or kept? Image shows icon. Let's keep text for usability but style it. */}
                        </Link>
                    </div>
                ) : (
                    <Link to="/login" className="btn-primary" style={{ textDecoration: 'none', padding: '0.5rem 1.5rem' }}>
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
