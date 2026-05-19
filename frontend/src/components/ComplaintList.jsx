import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ComplaintCard from './ComplaintCard';
import { Search, Filter, RefreshCcw } from 'lucide-react';

const ComplaintList = ({ refreshTrigger }) => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const fetchComplaints = useCallback(async (query = '') => {
        setLoading(true);
        try {
            const url = query ? `/complaints/search?location=${query}` : '/complaints';
            const res = await axios.get(url);
            setComplaints(res.data);
            setError('');
        } catch (err) {
            setError('Failed to load complaints');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    // API DELETE Request
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this complaint? (Demonstrating DELETE API)')) {
            try {
                await axios.delete(`/complaints/${id}`);
                // Remove from UI
                setComplaints(complaints.filter(c => c._id !== id));
            } catch (err) {
                alert('Error deleting complaint');
            }
        }
    };

    // API PUT Request
    const handleUpdateStatus = async (id, newStatus) => {
        try {
            const res = await axios.put(`/complaints/${id}`, { status: newStatus });
            // Update in UI
            setComplaints(complaints.map(c => c._id === id ? res.data : c));
        } catch (err) {
            alert('Error updating status');
        }
    };

    useEffect(() => {
        fetchComplaints();
    }, [refreshTrigger, fetchComplaints]);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchComplaints(searchQuery);
    };

    const clearSearch = () => {
        setSearchQuery('');
        fetchComplaints('');
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '15px' }}>
                <h3 style={{ color: 'var(--text-main)', margin: 0, fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Filter size={22} color="var(--primary-color)" />
                    Recent Tickets
                </h3>
                
                {/* Search Box */}
                <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ position: 'relative' }}>
                        <Search size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-light)' }} />
                        <input 
                            type="text" 
                            placeholder="Search by location..." 
                            className="form-control"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ width: '250px', paddingLeft: '38px', borderRadius: '30px' }}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ borderRadius: '30px' }}>
                        Search
                    </button>
                    {searchQuery && (
                        <button type="button" onClick={clearSearch} className="btn" style={{ borderRadius: '30px', background: 'var(--border-color)', color: 'var(--text-main)' }}>
                            Clear
                        </button>
                    )}
                </form>
            </div>

            {error && <div style={{ color: 'var(--danger)', marginBottom: '1rem', padding: '10px', background: 'var(--danger-light)', borderRadius: '8px' }}>{error}</div>}

            {loading ? (
                <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--primary-color)' }}>
                    <RefreshCcw size={32} className="spin-animation" style={{ marginBottom: '10px' }} />
                    <div>Loading tickets...</div>
                </div>
            ) : complaints.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', color: 'var(--text-light)', padding: '4rem', background: 'transparent', border: '2px dashed var(--border-color)' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '10px' }}>📁</div>
                    <h3 style={{ color: 'var(--text-main)', marginBottom: '5px' }}>No complaints found</h3>
                    <p>When you register a complaint, it will appear here.</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {complaints.map(complaint => (
                        <ComplaintCard 
                            key={complaint._id} 
                            complaint={complaint} 
                            onDelete={handleDelete}
                            onUpdateStatus={handleUpdateStatus}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ComplaintList;
