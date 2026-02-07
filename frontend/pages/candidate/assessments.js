import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AppLayout from '../../src/components/AppLayout';

const PAGE_SIZE = 6;

const CandidateAssessments = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [assessments, setAssessments] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchAssessments = async () => {
      setLoading(true);
      setError(null);
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL || '';
        const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

        // Try candidate-me assessments endpoint first
        const res = await fetch(`${apiBase}/api/candidates/me/assessments?page=${page}&limit=${PAGE_SIZE}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });

        if (!res.ok) throw new Error('Failed to load assessments');

        const data = await res.json();
        // Expect { total, assessments: [...] }
        setAssessments(data.assessments || []);
        setTotal(data.total || (data.assessments ? data.assessments.length : 0));
      } catch (err) {
        console.error(err);
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchAssessments();
  }, [page]);

  const startSession = async (campaign) => {
    try {
      const apiBase = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) ? import.meta.env.VITE_API_URL : (process.env.NEXT_PUBLIC_API_URL || '');
      const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

      const body = { campaignId: campaign._id };
      // If invite token exists, include it
      if (campaign.inviteToken) body.invitationToken = campaign.inviteToken;

      const res = await fetch(`${apiBase}/api/sessions/start`, {
        method: 'POST',
        headers: Object.assign({ 'Content-Type': 'application/json' }, token ? { Authorization: `Bearer ${token}` } : {}),
        body: JSON.stringify(body)
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.error || 'Failed to start session');
      }

      const data = await res.json();
      // navigate to session runner - use sessionUuid if returned, else id
      const sessionUuid = data.sessionUuid || data.sessionId || data.sessionId;
      router.push(`/candidate/session/${sessionUuid}`);
    } catch (err) {
      console.error('Start session failed', err);
      alert('Failed to start session: ' + (err.message || 'Unknown error'));
    }
  };

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <AppLayout role="candidate">
      <div>
        <h1>My Assessments</h1>

        {loading ? (
          <div className="loading">Loading assessments...</div>
        ) : error ? (
          <div className="error">Error: {error}</div>
        ) : assessments.length === 0 ? (
          <div className="empty">No assessments assigned.</div>
        ) : (
          <>
            <ul className="list">
              {assessments.map((a) => (
                <li key={a._id} className="item">
                  <div className="left">
                    <h3>{a.title || 'Assessment'}</h3>
                    <p>Status: {a.status || 'assigned'}</p>
                    <p>
                      {a.startAt ? new Date(a.startAt).toLocaleString() : 'Start: TBD'} — {a.endAt ? new Date(a.endAt).toLocaleString() : 'End: TBD'}
                    </p>
                  </div>
                  <div className="right">
                    {a.sessionId ? (
                      <Link href={`/candidate/session/${a.sessionId}`} className="btn">Continue</Link>
                    ) : (
                      <button className="btn" onClick={() => startSession(a)}>Start</button>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="pagination">
              <button disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</button>
              <span>Page {page} / {totalPages}</span>
              <button disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>Next</button>
            </div>
          </>
        )}

        <style jsx>{`
          h1 { margin: 0 0 12px 0; }
          .loading, .error, .empty { padding: 16px; }
          .list { list-style: none; padding: 0; margin: 0; display: grid; gap: 12px; }
          .item { display: flex; justify-content: space-between; align-items: center; padding: 12px; background: white; border: 1px solid #e5e7eb; border-radius: 8px; }
          .left h3 { margin: 0 0 6px 0; }
          .left p { margin: 0; color: #6b7280; }
          .btn { background: #2563eb; color: white; border: none; padding: 8px 12px; border-radius: 6px; text-decoration: none; cursor: pointer; }
          .pagination { margin-top: 12px; display: flex; gap: 8px; align-items: center; }
        `}</style>
      </div>
    </AppLayout>
  );
};

export default CandidateAssessments;
