import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

function ProtectedRoute({ children, role = null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (typeof window === 'undefined') return;

        const token = localStorage.getItem('accessToken');
        const apiBase = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) ? import.meta.env.VITE_API_URL : (process.env.NEXT_PUBLIC_API_URL || '');
        const res = await fetch(`${apiBase}/api/auth/me`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });

        if (!res.ok) {
          router.push('/auth/login');
          return;
        }

        const user = await res.json();

        if (role) {
          const allowed = Array.isArray(role) ? role.includes(user.role) : user.role === role;
          if (!allowed) {
            router.push('/');
            return;
          }
        }

        setAuthorized(true);
      } catch (err) {
        console.warn('Auth check failed:', err);
        router.push('/auth/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router, role]);

  if (loading) {
    return (
      <div className="auth-loading" style={{ padding: 24, textAlign: 'center' }}>
        Checking authentication...
      </div>
    );
  }

  if (!authorized) return null;

  return <>{children}</>;
}

export default ProtectedRoute;
