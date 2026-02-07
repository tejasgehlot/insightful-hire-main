import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AppLayout from '../../../src/components/AppLayout';

const API_BASE = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) ? import.meta.env.VITE_API_URL : (process.env.NEXT_PUBLIC_API_URL || '');

export default function ResultPage() {
  const router = useRouter();
  const { sessionId } = router.query;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [appealing, setAppealing] = useState(false);

  useEffect(() => {
    if (!sessionId) return;
    const fetchResult = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
        const res = await fetch(`${API_BASE}/api/results/${sessionId}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        if (!res.ok) throw new Error('Failed to load result');
        const data = await res.json();
        setResult(data);
      } catch (err) {
        console.error(err);
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [sessionId]);

  const handleDownload = () => {
    const url = `${API_BASE}/api/results/${sessionId}/download`;
    window.open(url, '_blank');
  };

  const handleAppeal = async () => {
    const reason = window.prompt('Please enter your reason for appeal:');
    if (!reason) return;
    setAppealing(true);
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
      const res = await fetch(`${API_BASE}/api/results/${sessionId}/appeal`, {
        method: 'POST',
        headers: Object.assign({ 'Content-Type': 'application/json' }, token ? { Authorization: `Bearer ${token}` } : {}),
        body: JSON.stringify({ reason })
      });
      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.error || 'Appeal failed');
      }
      alert('Appeal submitted successfully');
    } catch (err) {
      console.error('Appeal error', err);
      alert('Failed to submit appeal: ' + (err.message || 'Unknown'));
    } finally {
      setAppealing(false);
    }
  };

  if (loading) return (
    <AppLayout role="candidate">
      <div style={{ padding: 24 }}>Loading result...</div>
    </AppLayout>
  );

  if (error) return (
    <AppLayout role="candidate">
      <div style={{ padding: 24, color: 'red' }}>Error: {error}</div>
    </AppLayout>
  );

  const scores = result?.scores || {};

  return (
    <AppLayout role="candidate">
      <div style={{ padding: 16 }}>
        <h1>Result</h1>
        <div style={{ marginTop: 8 }}>
          <strong>Overall Score:</strong> {result?.overallScore ?? '—'}
        </div>

        <section style={{ marginTop: 16 }}>
          <h3>Section Breakdown</h3>
          {Object.keys(scores).length === 0 ? (
            <p>No section scores available.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb', padding: '8px' }}>Section</th>
                  <th style={{ textAlign: 'right', borderBottom: '1px solid #e5e7eb', padding: '8px' }}>Score</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(scores).map(([k, v]) => (
                  <tr key={k}>
                    <td style={{ padding: '8px', borderBottom: '1px solid #f3f4f6' }}>{k}</td>
                    <td style={{ padding: '8px', textAlign: 'right', borderBottom: '1px solid #f3f4f6' }}>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        <section style={{ marginTop: 16 }}>
          <h3>Skill Heatmap</h3>
          {result?.scores && Object.keys(result.scores).length > 0 ? (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb', padding: '8px' }}>Skill</th>
                  <th style={{ textAlign: 'right', borderBottom: '1px solid #e5e7eb', padding: '8px' }}>Value</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(result.scores).map(([skill, value]) => (
                  <tr key={skill}>
                    <td style={{ padding: '8px', borderBottom: '1px solid #f3f4f6' }}>{skill}</td>
                    <td style={{ padding: '8px', textAlign: 'right', borderBottom: '1px solid #f3f4f6' }}>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No skill data available.</p>
          )}
        </section>

        <div style={{ marginTop: 20, display: 'flex', gap: 8 }}>
          <button onClick={handleDownload} className="btn">Download PDF</button>
          <button onClick={handleAppeal} className="btn" disabled={appealing}>{appealing ? 'Submitting...' : 'Appeal'}</button>
        </div>

        <style jsx>{`
          .btn { background: #2563eb; color: white; padding: 8px 12px; border: none; border-radius:6px; cursor: pointer }
        `}</style>
      </div>
    </AppLayout>
  );
}
