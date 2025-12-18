import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import AboutPage from './pages/AboutPage';
import AnalystPage from './pages/AnalystPage';
import DashboardAdmin from './pages/DashboardAdmin';
import LearnMorePage from './pages/LearnMorePage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/learn-more" element={<LearnMorePage />} />
          <Route path="/analyst" element={<AnalystPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin" element={<DashboardAdmin />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
