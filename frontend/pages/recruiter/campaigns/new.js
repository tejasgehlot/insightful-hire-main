import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AppLayout from '../../../src/components/AppLayout';

const API_BASE = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) ? import.meta.env.VITE_API_URL : (process.env.NEXT_PUBLIC_API_URL || '');

export default function CampaignNew() {
  const router = useRouter();
  const [blueprints, setBlueprints] = useState([]);
  const [selectedBp, setSelectedBp] = useState('');
  const [startAt, setStartAt] = useState('');
  const [endAt, setEndAt] = useState('');
  const [invitesText, setInvitesText] = useState('');
  const [proctor, setProctor] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [created, setCreated] = useState(null);

  useEffect(() => { fetchBlueprints(); }, []);

  const fetchBlueprints = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
      const res = await fetch(`${API_BASE}/api/blueprints`, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
      if (!res.ok) throw new Error('Failed to load blueprints');
      const data = await res.json();
      setBlueprints(Array.isArray(data) ? data : (data.items || []));
      if (Array.isArray(data) && data.length > 0) setSelectedBp(data[0]._id || data[0].id);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
      const invites = invitesText.split('\n').map((s) => s.trim()).filter(Boolean);
      const payload = {
        blueprintId: selectedBp,
        startAt: startAt ? new Date(startAt).toISOString() : null,
        endAt: endAt ? new Date(endAt).toISOString() : null,
        invites,
        proctorOptions: { enabled: proctor }
      };

      const res = await fetch(`${API_BASE}/api/campaigns`, {
        method: 'POST',
        headers: Object.assign({ 'Content-Type': 'application/json' }, token ? { Authorization: `Bearer ${token}` } : {}),
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.error || 'Create failed');
      }
      const data = await res.json();
      setCreated(data);
      // Redirect to campaigns list after 1 second so user sees confirmation
      setTimeout(() => router.push('/recruiter/campaigns'), 1000);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Create failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AppLayout role="recruiter">
      <div style={{ padding: 16, maxWidth: 900 }}>
        <h1>Create Campaign</h1>
        {loading && <div>Loading blueprints...</div>}
        {error && <div style={{ color: 'red' }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ marginTop: 12 }}>
          <div style={{ marginBottom: 12 }}>
            <label>Blueprint</label>
            <select value={selectedBp} onChange={(e) => setSelectedBp(e.target.value)} style={{ marginLeft: 8, padding: 6 }}>
              {blueprints.map((b) => <option key={b._id || b.id} value={b._id || b.id}>{b.title || b.name || (b._id || b.id)}</option>)}
            </select>
          </div>

          <div style={{ marginBottom: 12 }}>
            <label>Start At</label>
            <input type="datetime-local" value={startAt} onChange={(e) => setStartAt(e.target.value)} style={{ marginLeft: 8 }} />
          </div>

          <div style={{ marginBottom: 12 }}>
            <label>End At</label>
            <input type="datetime-local" value={endAt} onChange={(e) => setEndAt(e.target.value)} style={{ marginLeft: 8 }} />
          </div>

          <div style={{ marginBottom: 12 }}>
            <label>Invites (one email per line)</label>
            <textarea rows={6} value={invitesText} onChange={(e) => setInvitesText(e.target.value)} style={{ display: 'block', width: '100%', padding: 8 }} />
          </div>

          <div style={{ marginBottom: 12 }}>
            <label><input type="checkbox" checked={proctor} onChange={(e) => setProctor(e.target.checked)} /> Enable proctoring</label>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button type="submit" disabled={submitting} className="btn">{submitting ? 'Creating...' : 'Create Campaign'}</button>
          </div>
        </form>

        {created && (
          <div style={{ marginTop: 16 }}>
            <h3>Campaign Created</h3>
            <div>Campaign ID: {created._id || created.id}</div>
            <div style={{ marginTop: 8 }}>
              <strong>Invites</strong>
              <ul>
                {(created.invites || []).map((inv, i) => <li key={i}>{inv.email || inv}</li>)}
              </ul>
            </div>
          </div>
        )}

        <style jsx>{`
          .btn { background: #111827; color: white; padding: 8px 10px; border: none; border-radius:6px; cursor: pointer }
        `}</style>
      </div>
    </AppLayout>
  );
}
