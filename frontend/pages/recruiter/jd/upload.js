import React, { useState } from 'react';
import { useRouter } from 'next/router';
import AppLayout from '../../../src/components/AppLayout';

const API_BASE = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) ? import.meta.env.VITE_API_URL : (process.env.NEXT_PUBLIC_API_URL || '');

export default function JDUpload() {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  const onFileChange = (e) => {
    setFile(e.target.files?.[0] || null);
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!file && !text.trim()) {
      setError('Please provide a file or paste the JD text.');
      return;
    }

    const fd = new FormData();
    if (file) fd.append('file', file);
    if (text && text.trim()) fd.append('rawText', text.trim());

    setLoading(true);
    showToast('Uploaded, parsing...');

    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
      const res = await fetch(`${API_BASE}/api/jd/upload`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: fd
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.error || 'Upload failed');
      }

      const data = await res.json().catch(() => null) || {};
      const jdId = data.jdId || data.id || data._id;
      if (!jdId) {
        // fallback: try to find id on nested object
        const candidateId = data?.jd?._id || data?.jd?.id;
        if (candidateId) {
          router.push(`/recruiter/jd/${candidateId}/preview`);
          return;
        }
        throw new Error('Upload succeeded but server did not return JD id');
      }

      router.push(`/recruiter/jd/${jdId}/preview`);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout role="recruiter">
      <div style={{ padding: 16, maxWidth: 900 }}>
        <h1>Upload Job Description</h1>

        <form onSubmit={handleSubmit} style={{ marginTop: 12 }}>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', marginBottom: 6 }}>Upload file (PDF / DOC / TXT)</label>
            <input type="file" accept=".pdf,.doc,.docx,.txt" onChange={onFileChange} />
            {file && <div style={{ marginTop: 8 }}>Selected: {file.name}</div>}
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', marginBottom: 6 }}>Or paste JD text</label>
            <textarea value={text} onChange={(e) => setText(e.target.value)} rows={10} style={{ width: '100%', padding: 8 }} />
          </div>

          {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}

          <div style={{ display: 'flex', gap: 8 }}>
            <button type="submit" disabled={loading} className="btn">{loading ? 'Uploading...' : 'Upload & Parse'}</button>
          </div>
        </form>

        {toast && (
          <div style={{ position: 'fixed', right: 20, top: 20, background: '#111827', color: 'white', padding: '10px 14px', borderRadius: 6 }}>{toast}</div>
        )}

        <style jsx>{`
          .btn { background: #059669; color: white; padding: 8px 12px; border: none; border-radius:6px; cursor: pointer }
        `}</style>
      </div>
    </AppLayout>
  );
}
