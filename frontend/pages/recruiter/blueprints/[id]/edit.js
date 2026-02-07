import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AppLayout from '../../../../src/components/AppLayout';

const API_BASE = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) ? import.meta.env.VITE_API_URL : (process.env.NEXT_PUBLIC_API_URL || '');

export default function BlueprintEdit() {
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [blueprint, setBlueprint] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchBp = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
        const res = await fetch(`${API_BASE}/api/blueprints/${id}`, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
        if (!res.ok) throw new Error('Failed to load blueprint');
        const data = await res.json();
        // ensure sections exist
        if (!data.sections) data.sections = [];
        // normalize questionsPerSkill default
        data.sections = data.sections.map((s) => ({ ...s, questionsPerSkill: s.questionsPerSkill ?? 1 }));
        setBlueprint(data);
      } catch (err) {
        console.error(err);
        setError(err.message || 'Error loading blueprint');
      } finally {
        setLoading(false);
      }
    };
    fetchBp();
  }, [id]);

  const updateSection = (index, changes) => {
    setBlueprint((b) => {
      const next = { ...b };
      next.sections = next.sections.map((s, i) => (i === index ? { ...s, ...changes } : s));
      return next;
    });
  };

  const handleDurationChange = (e) => {
    const val = e.target.value;
    setBlueprint((b) => ({ ...b, durationMinutes: Number(val) }));
  };

  const handleSave = async () => {
    if (!id) return;
    setSaving(true);
    setError(null);
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
      const payload = {
        sections: blueprint.sections.map((s) => ({ skill: s.skill, questionsPerSkill: Number(s.questionsPerSkill) })),
        durationMinutes: blueprint.durationMinutes || 0
      };
      const res = await fetch(`${API_BASE}/api/blueprints/${id}`, {
        method: 'PATCH',
        headers: Object.assign({ 'Content-Type': 'application/json' }, token ? { Authorization: `Bearer ${token}` } : {}),
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.error || 'Save failed');
      }
      const data = await res.json();
      setBlueprint(data);
      alert('Saved');
    } catch (err) {
      console.error('Save error', err);
      setError(err.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleGenerate = async () => {
    if (!id) return;
    setGenerating(true);
    setError(null);
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
      const res = await fetch(`${API_BASE}/api/blueprints/${id}/generate-questions`, {
        method: 'POST',
        headers: Object.assign({ 'Content-Type': 'application/json' }, token ? { Authorization: `Bearer ${token}` } : {}),
        body: JSON.stringify({})
      });
      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.error || 'Generate failed');
      }
      const data = await res.json();
      // attempt to find job id to redirect
      const jobId = data.jobId || data.blueprint?.jobId || data.blueprintId || data.id || data._id || blueprint?.jobId;
      if (!jobId) {
        // fallback: if blueprint id present, redirect to review with job param as blueprint id
        router.push(`/recruiter/questions/review?job=${blueprint?._id || id}`);
      } else {
        router.push(`/recruiter/questions/review?job=${jobId}`);
      }
    } catch (err) {
      console.error('Generate error', err);
      setError(err.message || 'Generate failed');
    } finally {
      setGenerating(false);
    }
  };

  if (loading) return (
    <AppLayout role="recruiter">
      <div style={{ padding: 16 }}>Loading blueprint...</div>
    </AppLayout>
  );

  if (error) return (
    <AppLayout role="recruiter">
      <div style={{ padding: 16, color: 'red' }}>Error: {error}</div>
    </AppLayout>
  );

  return (
    <AppLayout role="recruiter">
      <div style={{ padding: 16, maxWidth: 1000 }}>
        <h1>Blueprint Editor</h1>
        <div style={{ marginTop: 8 }}><strong>Blueprint:</strong> {blueprint.title || blueprint.name || blueprint._id}</div>

        <div style={{ marginTop: 16 }}>
          <label>Duration (minutes)</label>
          <input type="number" min={0} value={blueprint.durationMinutes || 0} onChange={handleDurationChange} style={{ marginLeft: 8, padding: 6, width: 120 }} />
        </div>

        <div style={{ marginTop: 20 }}>
          <h3>Sections</h3>
          {blueprint.sections.length === 0 && <div>No sections found.</div>}
          {blueprint.sections.map((s, idx) => (
            <div key={idx} style={{ padding: 12, border: '1px solid #e5e7eb', borderRadius: 6, marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div><strong>{s.skill || s.name || `Section ${idx+1}`}</strong></div>
                <div style={{ width: 320 }}>
                  <label style={{ display: 'block' }}>Questions per skill: {s.questionsPerSkill}</label>
                  <input type="range" min={0} max={20} value={s.questionsPerSkill} onChange={(e) => updateSection(idx, { questionsPerSkill: Number(e.target.value) })} style={{ width: '100%' }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
          <button onClick={handleSave} disabled={saving} className="btn">{saving ? 'Saving...' : 'Save'}</button>
          <button onClick={handleGenerate} disabled={generating} className="btn primary">{generating ? 'Generating...' : 'Approve & Generate Questions'}</button>
        </div>

        <style jsx>{`
          .btn { background: #111827; color: white; padding: 8px 12px; border: none; border-radius:6px; cursor: pointer }
          .btn.primary { background: #2563eb }
        `}</style>
      </div>
    </AppLayout>
  );
}
