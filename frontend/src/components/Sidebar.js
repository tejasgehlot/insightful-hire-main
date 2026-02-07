import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const recruiterMenu = [
  { label: 'Dashboard', href: '/recruiter' },
  { label: 'JD Upload', href: '/recruiter/jd/upload' },
  { label: 'JD Library', href: '/recruiter/jd/library' },
  { label: 'Blueprints', href: '/recruiter/blueprints' },
  { label: 'Question Review', href: '/recruiter/questions/review' },
  { label: 'Campaigns', href: '/recruiter/campaigns' },
  { label: 'Results', href: '/recruiter/results' },
  { label: 'Proctor', href: '/recruiter/proctor' },
  { label: 'Settings', href: '/recruiter/settings' }
];

const candidateMenu = [
  { label: 'Dashboard', href: '/candidate/dashboard' },
  { label: 'My Assessments', href: '/candidate/assessments' },
  { label: 'Scheduled', href: '/candidate/scheduled' },
  { label: 'Session', href: '/candidate/session' },
  { label: 'Results', href: '/candidate/results' },
  { label: 'Profile', href: '/candidate/profile' },
  { label: 'Help', href: '/candidate/help' }
];

function Sidebar({ role = 'candidate', onLogout = () => {} }) {
  const router = useRouter();
  const pathname = router?.pathname || '';

  const menu = role === 'recruiter' ? recruiterMenu : candidateMenu;

  const isActive = (href) => {
    if (!href) return false;
    // active when pathname equals or starts with href
    return pathname === href || pathname.startsWith(href + '/') || (href !== '/' && pathname.startsWith(href));
  };

  return (
    <nav className="sidebar" aria-label="Main Navigation">
      <ul className="sidebar-list">
        {menu.map((item) => (
          <li key={item.href} className={`sidebar-item ${isActive(item.href) ? 'active' : ''}`}>
            <Link href={item.href} className="sidebar-link">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="sidebar-footer">
        <button type="button" className="btn-logout" onClick={onLogout}>
          Logout
        </button>
      </div>

      <style jsx>{`
        .sidebar {
          width: 220px;
          padding: 16px;
          background: #ffffff;
          border-right: 1px solid #e6e6e6;
          height: 100vh;
          box-sizing: border-box;
        }
        .sidebar-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .sidebar-item {
          margin-bottom: 8px;
        }
        .sidebar-link {
          display: block;
          padding: 8px 10px;
          color: #111827;
          text-decoration: none;
          border-radius: 6px;
        }
        .sidebar-item.active .sidebar-link {
          background: #f3f4f6;
          font-weight: 600;
        }
        .sidebar-footer {
          margin-top: auto;
          padding-top: 16px;
        }
        .btn-logout {
          width: 100%;
          padding: 8px 10px;
          background: #ef4444;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }
      `}</style>
    </nav>
  );
}

export default Sidebar;
