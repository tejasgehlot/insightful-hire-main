import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import AppLayout from '../../src/components/AppLayout';

const CandidateDashboard = () => {
  const [user, setUser] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const apiBase = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) ? import.meta.env.VITE_API_URL : (process.env.NEXT_PUBLIC_API_URL || '');
        const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

        // Fetch user
        const meRes = await fetch(`${apiBase}/api/auth/me`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        if (!meRes.ok) throw new Error('Failed to load user');
        const meJson = await meRes.json();
        setUser(meJson);

        // Fetch summary
        const sumRes = await fetch(`${apiBase}/api/candidates/me/summary`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        if (!sumRes.ok) {
          // Do not hard-fail on summary; show empty
          setSummary(null);
        } else {
          const sumJson = await sumRes.json();
          setSummary(sumJson);
        }
      } catch (err) {
        console.error(err);
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <AppLayout role="candidate">
      <div>
        {loading ? (
          <div className="loading">Loading dashboard...</div>
        ) : error ? (
          <div className="error">Error: {error}</div>
        ) : (
          <>
            <h1 className="title">Welcome{user?.name ? `, ${user.name}` : ''}!</h1>

            <p className="subtitle">Quick actions</p>

            <div className="cards">
              <Link href="/candidate/assessments" className="card">
                <h3>Assigned Assessments</h3>
                <p>{summary?.assignedCount ?? '—'} assigned</p>
              </Link>

              <Link href="/candidate/results" className="card">
                <h3>Completed</h3>
                <p>{summary?.completedCount ?? '—'} completed</p>
              </Link>

              <Link href="/candidate/profile" className="card">
                <h3>Profile</h3>
                <p>View and update your profile</p>
              </Link>
            </div>
          </>
        )}

        <style jsx>{`
          .loading, .error { padding: 24px; text-align: center; }
          .title { margin: 0 0 8px 0; font-size: 28px; }
          .subtitle { margin: 0 0 16px 0; color: #6b7280; }
          .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; }
          .card { display: block; padding: 16px; background: white; border: 1px solid #e5e7eb; border-radius: 8px; text-decoration: none; color: inherit; }
          .card h3 { margin: 0 0 8px 0; }
          .card p { margin: 0; color: #6b7280; }
        `}</style>
      </div>
    </AppLayout>
  );
};

export default CandidateDashboard;
