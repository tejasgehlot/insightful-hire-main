import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import AppLayout from '../../../../src/components/AppLayout';

const API_BASE = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) ? import.meta.env.VITE_API_URL : (process.env.NEXT_PUBLIC_API_URL || '');

export default function JDPreview() {
  const router = useRouter();
  const { jdId } = router.query;
  const [loading, setLoading] = useState(true);
  const [jd, setJd] = useState(null);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ skills: '', softSkills: '', experience: '', contradictions: '' });
  const pollingRef = useRef(null);

  useEffect(() => {
    if (!jdId) return;

    const fetchJd = async () => {
      setError(null);
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
        const res = await fetch(`${API_BASE}/api/jd/${jdId}`, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
        if (!res.ok) throw new Error('Failed to fetch JD');
        const data = await res.json();
        setJd(data);
        // populate form when parsed
        if (data?.parsed) {
          setForm({
            skills: (data.parsed.skills || []).join(', '),
            softSkills: (data.parsed.softSkills || []).join(', '),
            experience: data.parsed.experience || '',
            contradictions: (data.parsed.contradictions || []).join('\n')
          });
        }
        setLoading(false);
        // if parsing, ensure polling
        if (data?.status === 'parsing') {
          if (!pollingRef.current) startPolling();
        } else {
          stopPolling();
        }
      } catch (err) {
        console.error(err);
        setError(err.message || 'Error fetching JD');
        setLoading(false);
      }
    };

    fetchJd();

    return () => stopPolling();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jdId]);

  const startPolling = () => {
    if (pollingRef.current) return;
    pollingRef.current = setInterval(async () => {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
        const res = await fetch(`${API_BASE}/api/jd/${jdId}`, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
        if (!res.ok) return;
        const data = await res.json();
        setJd(data);
        if (data?.status !== 'parsing') {
          stopPolling();
          if (data?.parsed) {
            setForm({
              skills: (data.parsed.skills || []).join(', '),
              softSkills: (data.parsed.softSkills || []).join(', '),
              experience: data.parsed.experience || '',
              contradictions: (data.parsed.contradictions || []).join('\n')
            });
          }
        }
      } catch (err) {
        console.warn('Polling error', err);
      }
    }, 2000);
  };

  const stopPolling = () => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  };

  const handleEditToggle = () => setEditing((v) => !v);

  const handleChange = (k) => (e) => setForm((s) => ({ ...s, [k]: e.target.value }));

  const handleSave = async () => {
    setError(null);
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
      const body = {
        parsed: {
          skills: form.skills.split(',').map((s) => s.trim()).filter(Boolean),
          softSkills: form.softSkills.split(',').map((s) => s.trim()).filter(Boolean),
          experience: form.experience,
          contradictions: form.contradictions.split('\n').map((s) => s.trim()).filter(Boolean)
        }
      };
      const res = await fetch(`${API_BASE}/api/jd/${jdId}`, {
        method: 'PUT',
        headers: Object.assign({ 'Content-Type': 'application/json' }, token ? { Authorization: `Bearer ${token}` } : {}),
        body: JSON.stringify(body)
      });
      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.error || 'Save failed');
      }
      const data = await res.json();
      setJd(data);
      setEditing(false);
    } catch (err) {
      console.error('Save error', err);
      setError(err.message || 'Save failed');
    }
  };

  const handleGenerate = async () => {
    setError(null);
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
      const res = await fetch(`${API_BASE}/api/blueprints/generate`, {
        method: 'POST',
        headers: Object.assign({ 'Content-Type': 'application/json' }, token ? { Authorization: `Bearer ${token}` } : {}),
        body: JSON.stringify({ jdId })
      });
      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.error || 'Generate failed');
      }
      const data = await res.json();
      const blueprintId = data.blueprintId || data.id || data._id;
      if (!blueprintId) throw new Error('No blueprint id returned');
      router.push(`/recruiter/blueprints/${blueprintId}/edit`);
    } catch (err) {
      console.error('Generate error', err);
      setError(err.message || 'Generate failed');
    }
  };

  return (
    <AppLayout role="recruiter">
      <div style={{ padding: 16, maxWidth: 960 }}>
        <h1>JD Preview</h1>
        {loading && <div>Loading...</div>}
        {error && <div style={{ color: 'red' }}>Error: {error}</div>}
        {!loading && jd && (
          <div>
            <div style={{ marginTop: 8 }}><strong>Title:</strong> {jd.title || jd.rawFilename || 'Untitled'}</div>
            <div style={{ marginTop: 8 }}><strong>Status:</strong> {jd.status || 'unknown'}</div>

            {jd.status === 'parsing' && <div style={{ marginTop: 12, color: '#6b7280' }}>Parsing in progress...</div>}

            {jd.parsed ? (
              <div style={{ marginTop: 16 }}>
                {!editing ? (
                  <div>
                    <h3>Parsed Summary</h3>
                    <div><strong>Skills:</strong> {(jd.parsed.skills || []).join(', ')}</div>
                    <div style={{ marginTop: 8 }}><strong>Soft Skills:</strong> {(jd.parsed.softSkills || []).join(', ')}</div>
                    <div style={{ marginTop: 8 }}><strong>Experience:</strong> {jd.parsed.experience || '—'}</div>
                    <div style={{ marginTop: 8 }}><strong>Contradictions:</strong>
                      <ul>{(jd.parsed.contradictions || []).map((c, i) => <li key={i}>{c}</li>)}</ul>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3>Edit Parsed Summary</h3>
                    <div style={{ marginBottom: 8 }}>
                      <label>Skills (comma separated)</label>
                      <input value={form.skills} onChange={handleChange('skills')} style={{ width: '100%', padding: 8 }} />
                    </div>
                    <div style={{ marginBottom: 8 }}>
                      <label>Soft Skills (comma separated)</label>
                      <input value={form.softSkills} onChange={handleChange('softSkills')} style={{ width: '100%', padding: 8 }} />
                    </div>
                    <div style={{ marginBottom: 8 }}>
                      <label>Experience text</label>
                      <textarea value={form.experience} onChange={handleChange('experience')} rows={4} style={{ width: '100%', padding: 8 }} />
                    </div>
                    <div style={{ marginBottom: 8 }}>
                      <label>Contradictions (one per line)</label>
                      <textarea value={form.contradictions} onChange={handleChange('contradictions')} rows={4} style={{ width: '100%', padding: 8 }} />
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={handleSave} className="btn">Save</button>
                      <button onClick={handleEditToggle} className="btn gray">Cancel</button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ marginTop: 16, color: '#6b7280' }}>No parsed data available yet.</div>
            )}

            <div style={{ marginTop: 20, display: 'flex', gap: 8 }}>
              <button onClick={handleEditToggle} className="btn">{editing ? 'Close Editor' : 'Edit'}</button>
              <button onClick={handleGenerate} className="btn">Generate Assessment</button>
            </div>
          </div>
        )}

        <style jsx>{`
          .btn { background: #1f2937; color: white; padding: 8px 12px; border: none; border-radius:6px; cursor: pointer }
          .btn.gray { background: #6b7280 }
        `}</style>
      </div>
    </AppLayout>
  );
}
