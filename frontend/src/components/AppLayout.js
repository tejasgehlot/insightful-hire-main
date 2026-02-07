import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import Sidebar from './Sidebar';
import ProtectedRoute from './ProtectedRoute';

function AppLayout({ children, role = 'candidate' }) {
  const router = useRouter();

  const onLogout = useCallback(async () => {
    try {
      const apiBase = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) ? import.meta.env.VITE_API_URL : (process.env.NEXT_PUBLIC_API_URL || '');
      const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

      await fetch(`${apiBase}/api/auth/logout`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });

      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }

      router.push('/auth/login');
    } catch (err) {
      console.error('Logout failed:', err);
      router.push('/auth/login');
    }
  }, [router]);

  return (
    <ProtectedRoute role={role}>
      <div className="app-layout">
        <Sidebar role={role} onLogout={onLogout} />
        <main className="app-main">{children}</main>
      
        <style jsx>{`
          .app-layout {
            display: flex;
            min-height: 100vh;
            background: #f8fafc;
          }
          .app-main {
            flex: 1;
            padding: 24px;
            box-sizing: border-box;
          }
        `}</style>
      </div>
    </ProtectedRoute>
  );
}

export default AppLayout;
