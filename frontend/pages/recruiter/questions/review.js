import React, { useEffect, useState } from 'react';
import AppLayout from '../../../../src/components/AppLayout';

const API_BASE = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) ? import.meta.env.VITE_API_URL : (process.env.NEXT_PUBLIC_API_URL || '');

export default function QuestionsReview() {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);

  const [editing, setEditing] = useState(null); // question being edited
  const [editBody, setEditBody] = useState({ text: '', options: [], answer: '', confidence: 0 });

  useEffect(() => {
    fetchQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
      const res = await fetch(`${API_BASE}/api/questions/review`, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
      if (!res.ok) throw new Error('Failed to fetch questions');
      const data = await res.json();
      setQuestions(Array.isArray(data) ? data : (data.items || []));
    } catch (err) {
      console.error(err);
      setError(err.message || 'Error loading');
    } finally {
      setLoading(false);
    }
  };

  const doAction = async (id, action) => {
    setError(null);
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
      const res = await fetch(`${API_BASE}/api/questions/${id}/${action}`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.error || `${action} failed`);
      }
      await fetchQuestions();
    } catch (err) {
      console.error(err);
      setError(err.message || 'Action failed');
    }
  };

  const openEdit = (q) => {
    setEditing(q);
    setEditBody({ text: q.text || '', options: q.options || [], answer: q.answer || '', confidence: q.confidence || 0 });
  };

  const closeEdit = () => {
    setEditing(null);
    setEditBody({ text: '', options: [], answer: '', confidence: 0 });
  };

  const saveEdit = async () => {
    if (!editing) return;
    setError(null);
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
      const res = await fetch(`${API_BASE}/api/questions/${editing._id || editing.id}`, {
        method: 'PATCH',
        headers: Object.assign({ 'Content-Type': 'application/json' }, token ? { Authorization: `Bearer ${token}` } : {}),
        body: JSON.stringify(editBody)
      });
      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.error || 'Save failed');
      }
      closeEdit();
      await fetchQuestions();
    } catch (err) {
      console.error('Save error', err);
      setError(err.message || 'Save failed');
    }
  };

  return (
    <AppLayout role="recruiter">
      <div style={{ padding: 16, maxWidth: 1000 }}>
        <h1>Question Review</h1>
        {loading && <div>Loading pending questions...</div>}
        {error && <div style={{ color: 'red' }}>{error}</div>}

        {!loading && questions.length === 0 && <div>No pending questions.</div>}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
          {questions.map((q) => (
            <div key={q._id || q.id} style={{ border: '1px solid #e5e7eb', padding: 12, borderRadius: 6 }}>
              <div style={{ marginBottom: 8 }}><strong>{q.text}</strong></div>
              {q.options && q.options.length > 0 && (
                <ul>
                  {q.options.map((opt, i) => (
                    <li key={i} style={{ marginBottom: 4 }}>{opt}{q.answer === opt ? ' (answer)' : ''}</li>
                  ))}
                </ul>
              )}
              <div style={{ marginTop: 8 }}><em>Confidence:</em> {q.confidence ?? '—'}</div>

              <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
                <button onClick={() => doAction(q._id || q.id, 'approve')} className="btn">Approve</button>
                <button onClick={() => doAction(q._id || q.id, 'reject')} className="btn gray">Reject</button>
                <button onClick={() => openEdit(q)} className="btn">Edit</button>
              </div>
            </div>
          ))}
        </div>

        {editing && (
          <div style={{ position: 'fixed', left: 0, top: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: 'white', padding: 16, width: 700, borderRadius: 8 }}>
              <h3>Edit Question</h3>
              <div style={{ marginBottom: 8 }}>
                <label>Text</label>
                <textarea value={editBody.text} onChange={(e) => setEditBody((s) => ({ ...s, text: e.target.value }))} rows={3} style={{ width: '100%', padding: 8 }} />
              </div>
              <div style={{ marginBottom: 8 }}>
                <label>Options (one per line)</label>
                <textarea value={(editBody.options || []).join('\n')} onChange={(e) => setEditBody((s) => ({ ...s, options: e.target.value.split('\n').map((x) => x.trim()).filter(Boolean) }))} rows={4} style={{ width: '100%', padding: 8 }} />
              </div>
              <div style={{ marginBottom: 8 }}>
                <label>Answer</label>
                <input value={editBody.answer} onChange={(e) => setEditBody((s) => ({ ...s, answer: e.target.value }))} style={{ width: '100%', padding: 8 }} />
              </div>
              <div style={{ marginBottom: 8 }}>
                <label>Confidence</label>
                <input type="number" min={0} max={1} step={0.01} value={editBody.confidence} onChange={(e) => setEditBody((s) => ({ ...s, confidence: Number(e.target.value) }))} style={{ width: 120, padding: 8 }} />
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={saveEdit} className="btn">Save</button>
                <button onClick={closeEdit} className="btn gray">Cancel</button>
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
          .btn { background: #111827; color: white; padding: 6px 10px; border: none; border-radius:6px; cursor: pointer }
          .btn.gray { background: #6b7280 }
        `}</style>
      </div>
    </AppLayout>
  );
}
