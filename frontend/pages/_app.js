import React, { useEffect, useState } from 'react';
import App from 'next/app';
import { useRouter } from 'next/router';
import AppLayout from '../src/components/AppLayout';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (typeof window === 'undefined') return;
        const token = localStorage.getItem('accessToken');
        if (!token) {
          setChecking(false);
          return;
        }
        const apiBase = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) ? import.meta.env.VITE_API_URL : (process.env.NEXT_PUBLIC_API_URL || '');
        const res = await fetch(`${apiBase}/api/auth/me`, { headers: { Authorization: `Bearer ${token}` } });
        if (!res.ok) {
          setChecking(false);
          return;
        }
        const u = await res.json();
        setUser(u);
      } catch (err) {
        console.warn('Failed to fetch user', err);
      } finally {
        setChecking(false);
      }
    };

    fetchUser();
  }, []);

  // Only wrap recruiter and candidate dashboard routes
  const path = router.pathname || '';
  const isDashboardRoute = path.startsWith('/recruiter') || path.startsWith('/candidate');

  if (checking) return <div style={{ padding: 24 }}>Initializing...</div>;

  if (isDashboardRoute && user) {
    return (
      <AppLayout role={user.role}>
        <Component {...pageProps} />
      </AppLayout>
    );
  }

  return <Component {...pageProps} />;
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default MyApp;
