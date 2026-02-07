import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import AppLayout from '../../../src/components/AppLayout';

const API_BASE = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) ? import.meta.env.VITE_API_URL : (process.env.NEXT_PUBLIC_API_URL || '');

export default function SessionPage() {
  const router = useRouter();
  const { sessionId } = router.query;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [session, setSession] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastSavedAt, setLastSavedAt] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const autosaveRef = useRef(null);

  useEffect(() => {
    if (!sessionId) return;

    const fetchSession = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
        const res = await fetch(`${API_BASE}/api/sessions/${sessionId}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });

        if (!res.ok) throw new Error('Failed to load session');

        const data = await res.json();
        setSession(data);

        // Initialize answers: use stored answers or dummy placeholders
        if (data.answers && Array.isArray(data.answers) && data.answers.length > 0) {
          setAnswers(data.answers.map((a) => ({ questionId: a.questionId || null, answer: a.answer || '' })));
        } else {
          // create 5 placeholder questions
          setAnswers(Array.from({ length: 5 }).map((_, i) => ({ questionId: `q${i + 1}`, answer: '' })));
        }
      } catch (err) {
        console.error(err);
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [sessionId]);

  // Autosave every 15 seconds
  useEffect(() => {
    if (!sessionId) return;
    const tick = async () => {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
        await fetch(`${API_BASE}/api/sessions/${sessionId}/save`, {
          method: 'POST',
          headers: Object.assign({ 'Content-Type': 'application/json' }, token ? { Authorization: `Bearer ${token}` } : {}),
          body: JSON.stringify({ answers })
        });
        setLastSavedAt(new Date());
      } catch (err) {
        console.warn('Autosave failed', err);
      }
    };

    // start interval
    autosaveRef.current = setInterval(tick, 15000);

    // also run one immediately after mount
    tick();

    return () => {
      clearInterval(autosaveRef.current);
    };
  }, [sessionId, answers]);

  const updateAnswer = (index, value) => {
    setAnswers((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], answer: value };
      return copy;
    });
  };

  const finish = async () => {
    if (!sessionId) return;
    setSubmitting(true);
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
      const res = await fetch(`${API_BASE}/api/sessions/${sessionId}/submit`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.error || 'Submit failed');
      }

      const data = await res.json();
      // redirect to results page
      router.push(`/candidate/results/${sessionId}`);
    } catch (err) {
      console.error(err);
      alert('Failed to submit: ' + (err.message || 'Unknown error'));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <AppLayout role="candidate">
      <div style={{ padding: 24 }}>Loading session...</div>
    </AppLayout>
  );

  if (error) return (
    <AppLayout role="candidate">
      <div style={{ padding: 24, color: 'red' }}>Error: {error}</div>
    </AppLayout>
  );

  return (
    <AppLayout role="candidate">
      <div className="session-root">
        <header className="session-header">
          <div className="timer">Time left: {/* placeholder */} 01:59:30</div>
          <div className="last-saved">Last saved: {lastSavedAt ? lastSavedAt.toLocaleTimeString() : '—'}</div>
        </header>

        <div className="session-body">
          <aside className="navigator">
            <h4>Questions</h4>
            <ul>
              {answers.map((a, idx) => (
                <li key={a.questionId} className={idx === currentIndex ? 'active' : ''}>
                  <button onClick={() => setCurrentIndex(idx)}>Q{idx + 1}</button>
                </li>
              ))}
            </ul>
          </aside>

          <main className="panel">
            <h3>Question {currentIndex + 1}</h3>
            <p className="question-placeholder">This is a placeholder for the question content.</p>

            <textarea
              value={answers[currentIndex]?.answer || ''}
              onChange={(e) => updateAnswer(currentIndex, e.target.value)}
              placeholder="Type your answer here..."
              rows={10}
              style={{ width: '100%', padding: 8 }}
            />

            <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
              <button onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))} disabled={currentIndex === 0}>Prev</button>
              <button onClick={() => setCurrentIndex((i) => Math.min(answers.length - 1, i + 1))} disabled={currentIndex === answers.length - 1}>Next</button>
              <div style={{ flex: 1 }} />
              <button onClick={finish} disabled={submitting} className="finish-btn">{submitting ? 'Submitting...' : 'Finish'}</button>
            </div>
          </main>
        </div>

        <style jsx>{`
          .session-root { padding: 16px; }
          .session-header { display:flex; justify-content: space-between; align-items:center; margin-bottom:12px }
          .session-body { display: flex; gap: 12px; }
          .navigator { width: 160px; background: white; border: 1px solid #e5e7eb; padding: 12px; border-radius: 8px; }
          .navigator ul { list-style:none; padding:0; margin:0; display:flex; flex-direction: column; gap:6px }
          .navigator li button { width:100%; padding:6px; border-radius:6px; border: none; background:#f3f4f6; cursor:pointer }
          .navigator li.active button { background:#c7d2fe; font-weight:600 }
          .panel { flex:1; background: white; padding: 12px; border: 1px solid #e5e7eb; border-radius: 8px }
          .finish-btn { background:#10b981; color:white; padding:8px 12px; border:none; border-radius:6px; cursor:pointer }
        `}</style>
      </div>
    </AppLayout>
  );
}
