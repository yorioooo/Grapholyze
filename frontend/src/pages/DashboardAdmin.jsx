import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import AuthContext from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const DashboardAdmin = () => {
    const { user, loading } = useContext(AuthContext);
    const navigate = useNavigate();
    const [stats, setStats] = useState({ totalUsers: 0, totalTests: 0, distribution: [] });
    const [users, setUsers] = useState([]);

    // Auth Check
    useEffect(() => {
        if (!loading) {
            if (!user || user.role !== 'admin') {
                navigate('/login');
            }
        }
    }, [user, loading, navigate]);

    // Fetch Data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const statsRes = await api.get('/admin/stats');
                setStats(statsRes.data);

                const usersRes = await api.get('/admin/users');
                setUsers(usersRes.data);
            } catch (error) {
                console.error("Failed to fetch admin data", error);
            }
        };
        if (user?.role === 'admin') fetchData();
    }, [user]);

    // Data for Charts
    const pieData = stats.distribution.map(d => ({ name: d._id, value: d.count }));
    const COLORS = ['#6366f1', '#ec4899', '#10b981', '#fbbf24', '#8b5cf6'];

    return (
        <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
            <Navbar />
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 20px 40px' }}>
                <h1 style={{ marginBottom: '2rem', color: '#1e293b' }}>Admin Dashboard</h1>

                {/* Stats Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                    <StatCard title="Total Users" value={stats.totalUsers} color="#6366f1" />
                    <StatCard title="Total Tests" value={stats.totalTests} color="#ec4899" />
                    <StatCard title="Active Types" value={stats.distribution.length} color="#10b981" />
                </div>

                {/* Charts Section */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
                    <div className="glass-panel" style={{ background: 'white', padding: '1.5rem', height: '400px' }}>
                        <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>Personality Distribution</h3>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                    label
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="glass-panel" style={{ background: 'white', padding: '1.5rem', height: '400px', overflowY: 'auto' }}>
                        <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>Recent Users</h3>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
                                    <th style={{ padding: '0.5rem' }}>Name</th>
                                    <th style={{ padding: '0.5rem' }}>Email</th>
                                    <th style={{ padding: '0.5rem' }}>Phone</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.slice(0, 10).map(u => (
                                    <tr key={u._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '0.5rem' }}>{u.name}</td>
                                        <td style={{ padding: '0.5rem', color: '#64748b' }}>{u.email}</td>
                                        <td style={{ padding: '0.5rem', color: '#64748b' }}>{u.phoneNumber || '-'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

const StatCard = ({ title, value, color }) => (
    <div className="glass-panel" style={{ background: 'white', padding: '1.5rem', borderLeft: `5px solid ${color}` }}>
        <h4 style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{title}</h4>
        <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1e293b' }}>{value}</span>
    </div>
);

export default DashboardAdmin;
