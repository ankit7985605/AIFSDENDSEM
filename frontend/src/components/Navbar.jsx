import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ShieldAlert, LogOut } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="container nav-container">
                <Link to="/" className="logo">
                    <ShieldAlert size={28} />
                    <span>Smart Complaint System</span>
                </Link>
                <div className="nav-links">
                    {user ? (
                        <>
                            <Link to="/dashboard">Dashboard</Link>
                            <span style={{ color: 'var(--text-light)', borderLeft: '1px solid var(--border-color)', paddingLeft: '15px' }}>
                                Hi, {user.name}
                            </span>
                            <button onClick={handleLogout} className="logout-btn" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <LogOut size={18} /> Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/signup" className="btn btn-primary" style={{ padding: '0.4rem 1rem' }}>Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
