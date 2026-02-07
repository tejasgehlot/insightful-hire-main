import React, { useEffect, useState } from 'react';
import AppLayout from '../../../src/components/AppLayout';
import Link from 'next/link';

const API_BASE = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) ? import.meta.env.VITE_API_URL : (process.env.NEXT_PUBLIC_API_URL || '');

export default function CampaignsIndex() {
  const [loading, setLoading] = useState(true);
  const [campaigns, setCampaigns] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
      const res = await fetch(`${API_BASE}/api/campaigns`, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
      if (!res.ok) throw new Error('Failed to load campaigns');
      const data = await res.json();
      setCampaigns(Array.isArray(data) ? data : (data.items || []));
    } catch (err) {
      console.error(err);
      setError(err.message || 'Error');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = (id) => {
    const url = `${API_BASE}/api/campaigns/${id}/export`;
    window.open(url, '_blank');
  };

  return (
    <AppLayout role="recruiter">
      <div style={{ padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>Campaigns</h1>
          <Link href="/recruiter/campaigns/new"><button className="btn">New Campaign</button></Link>
        </div>

        {loading && <div>Loading campaigns...</div>}
        {error && <div style={{ color: 'red' }}>{error}</div>}

        {!loading && campaigns.length === 0 && <div>No campaigns found.</div>}

        <div style={{ marginTop: 12 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #e5e7eb' }}>Name</th>
                <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #e5e7eb' }}>Status</th>
                <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #e5e7eb' }}>Start</th>
                <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #e5e7eb' }}>End</th>
                <th style={{ textAlign: 'right', padding: 8, borderBottom: '1px solid #e5e7eb' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c) => (
                <tr key={c._id || c.id}>
                  <td style={{ padding: 8, borderBottom: '1px solid #f3f4f6' }}>{c.name || c.title || (c.blueprintName || 'Campaign')}</td>
                  <td style={{ padding: 8, borderBottom: '1px solid #f3f4f6' }}>{c.status || 'draft'}</td>
                  <td style={{ padding: 8, borderBottom: '1px solid #f3f4f6' }}>{c.startAt ? new Date(c.startAt).toLocaleString() : '—'}</td>
                  <td style={{ padding: 8, borderBottom: '1px solid #f3f4f6' }}>{c.endAt ? new Date(c.endAt).toLocaleString() : '—'}</td>
                  <td style={{ padding: 8, borderBottom: '1px solid #f3f4f6', textAlign: 'right' }}>
                    <Link href={`/recruiter/campaigns/${c._id || c.id}/view`}><button className="btn small">View</button></Link>
                    <button onClick={() => handleExport(c._id || c.id)} className="btn small gray" style={{ marginLeft: 8 }}>Export</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <style jsx>{`
          .btn { background: #111827; color: white; padding: 8px 10px; border: none; border-radius:6px; cursor: pointer }
          .btn.small { padding: 6px 8px; font-size: 0.9rem }
          .btn.gray { background: #6b7280 }
        `}</style>
      </div>
    </AppLayout>
  );
}
