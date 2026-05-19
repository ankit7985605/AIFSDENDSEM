import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import ComplaintForm from '../components/ComplaintForm';
import ComplaintList from '../components/ComplaintList';
import { FileText, CheckCircle, Clock } from 'lucide-react';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleComplaintAdded = (newComplaint) => {
        setRefreshTrigger(prev => prev + 1);
    };

    return (
        <div className="container" style={{ padding: '2rem 20px', maxWidth: '1400px' }}>
            
            {/* Welcome Banner */}
            <div className="card" style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--primary-gradient)', color: 'white', border: 'none' }}>
                <div>
                    <h2 style={{ marginBottom: '0.5rem', fontSize: '1.8rem' }}>
                        Welcome back, {user?.name}! 👋
                    </h2>
                    <p style={{ opacity: 0.9 }}>Here is an overview of your citizen complaints.</p>
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <div style={{ background: 'rgba(255,255,255,0.2)', padding: '10px 20px', borderRadius: '12px', textAlign: 'center' }}>
                        <FileText size={24} style={{ marginBottom: '5px' }} />
                        <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Active Portal</div>
                    </div>
                </div>
            </div>
            
            {/* 2-Column Layout */}
            <div className="dashboard-grid">
                {/* Left Section: Form */}
                <section className="form-section">
                    <ComplaintForm onComplaintAdded={handleComplaintAdded} />
                </section>

                {/* Right Section: List */}
                <section className="list-section">
                    <ComplaintList refreshTrigger={refreshTrigger} />
                </section>
            </div>
        </div>
    );
};

export default Dashboard;
