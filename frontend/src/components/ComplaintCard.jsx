import { Trash2, Edit } from 'lucide-react';

const ComplaintCard = ({ complaint, onDelete, onUpdateStatus }) => {
    
    // Helper to get status class
    const getStatusClass = (status) => {
        switch(status) {
            case 'Pending': return 'status-badge status-pending';
            case 'In Progress': return 'status-badge status-progress';
            case 'Resolved': return 'status-badge status-resolved';
            case 'Rejected': return 'status-badge status-rejected';
            default: return 'status-badge';
        }
    };

    // Helper to get priority color
    const getPriorityColor = (priority) => {
        if (!priority) return 'gray';
        const p = priority.toLowerCase();
        if (p.includes('high')) return '#ef4444'; // Red
        if (p.includes('medium')) return '#f59e0b'; // Orange
        if (p.includes('low')) return '#10b981'; // Green
        return 'gray';
    };

    return (
        <div className="card" style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                    <h4 style={{ margin: 0, fontSize: '1.3rem', color: 'var(--text-main)', fontWeight: '700' }}>{complaint.title}</h4>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-light)', fontWeight: '500' }}>
                        Filed on: {new Date(complaint.createdAt).toLocaleDateString()} | Location: {complaint.location}
                    </span>
                </div>
                <div className={getStatusClass(complaint.status)}>
                    {complaint.status}
                </div>
            </div>

            <p style={{ marginBottom: '1.5rem', color: 'var(--text-main)' }}>
                {complaint.description}
            </p>

            {/* AI Generated Information Section */}
            {complaint.aiSummary && (
                <div style={{ 
                    backgroundColor: 'var(--secondary-color)', 
                    padding: '12px', 
                    borderRadius: 'var(--radius)',
                    border: '1px solid var(--border-color)',
                    fontSize: '0.9rem'
                }}>
                    <h5 style={{ marginBottom: '8px', color: 'var(--primary-dark)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        ✨ AI Analysis
                    </h5>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '8px' }}>
                        <div>
                            <strong>Priority:</strong> 
                            <span style={{ color: getPriorityColor(complaint.aiPriority), fontWeight: 'bold', marginLeft: '5px' }}>
                                {complaint.aiPriority}
                            </span>
                        </div>
                        <div>
                            <strong>Department:</strong> {complaint.aiDepartment}
                        </div>
                    </div>
                    <div style={{ marginBottom: '5px' }}>
                        <strong>Summary:</strong> {complaint.aiSummary}
                    </div>
                    <div>
                        <strong>Auto-Response:</strong> <em style={{ color: 'var(--text-light)' }}>"{complaint.aiResponse}"</em>
                    </div>
                </div>
            )}
            {/* Action Buttons for PUT and DELETE */}
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '10px', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                <button 
                    onClick={() => onUpdateStatus(complaint._id, 'Resolved')}
                    className="btn" 
                    style={{ background: 'var(--success-light)', color: 'var(--success)', flex: 1, padding: '0.5rem' }}
                >
                    <Edit size={16} /> Mark Resolved (PUT)
                </button>
                <button 
                    onClick={() => onDelete(complaint._id)}
                    className="btn" 
                    style={{ background: 'var(--danger-light)', color: 'var(--danger)', padding: '0.5rem 1rem' }}
                    title="Delete Complaint"
                >
                    <Trash2 size={16} /> (DELETE)
                </button>
            </div>
        </div>
    );
};

export default ComplaintCard;
