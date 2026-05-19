import { useState } from 'react';
import axios from 'axios';
import { Send, Sparkles } from 'lucide-react';

const ComplaintForm = ({ onComplaintAdded }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        location: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [aiStatus, setAiStatus] = useState('');

    const categories = [
        'Water Supply',
        'Electricity',
        'Roads & Transport',
        'Sanitation & Garbage',
        'Public Health',
        'Law & Order',
        'Other'
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.title || !formData.description || !formData.category || !formData.location) {
            setError('Please fill in all fields');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            setAiStatus('Analyzing with AI...');
            const aiResponse = await axios.post('/ai/analyze', { description: formData.description });
            const aiData = aiResponse.data;

            setAiStatus('Saving complaint...');
            const fullComplaintData = {
                ...formData,
                aiPriority: aiData.priority,
                aiDepartment: aiData.department,
                aiSummary: aiData.summary,
                aiResponse: aiData.autoResponse
            };

            const response = await axios.post('/complaints', fullComplaintData);
            
            setFormData({ title: '', description: '', category: '', location: '' });
            setAiStatus('');
            onComplaintAdded(response.data);
            
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Something went wrong. Please try again.');
            setAiStatus('');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="card" style={{ position: 'sticky', top: '100px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                <div style={{ background: 'var(--primary-gradient)', padding: '10px', borderRadius: '12px', color: 'white' }}>
                    <Send size={20} />
                </div>
                <h3 style={{ color: 'var(--text-main)', margin: 0, fontSize: '1.3rem' }}>File Complaint</h3>
            </div>
            
            {error && (
                <div style={{ backgroundColor: 'var(--danger-light)', color: 'var(--danger)', padding: '12px', borderRadius: '8px', marginBottom: '15px', border: '1px solid rgba(239, 68, 68, 0.2)', fontSize: '0.9rem', fontWeight: '500' }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Issue Title</label>
                    <input
                        type="text"
                        name="title"
                        className="form-control"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="E.g., Broken water pipe"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select
                        name="category"
                        className="form-control"
                        value={formData.category}
                        onChange={handleChange}
                    >
                        <option value="">Select a Category</option>
                        {categories.map((cat, idx) => (
                            <option key={idx} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="location">Exact Location</label>
                    <input
                        type="text"
                        name="location"
                        className="form-control"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Landmark or Address"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Detailed Description</label>
                    <textarea
                        name="description"
                        className="form-control"
                        rows="4"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe the issue in detail..."
                    ></textarea>
                </div>

                <button 
                    type="submit" 
                    className="btn btn-primary btn-block" 
                    disabled={isLoading}
                    style={{ marginTop: '10px' }}
                >
                    {isLoading ? (
                        <>
                            <Sparkles size={18} className="spin-animation" /> 
                            {aiStatus}
                        </>
                    ) : (
                        <>Submit with AI <Sparkles size={18}/></>
                    )}
                </button>
            </form>
        </div>
    );
};

export default ComplaintForm;
