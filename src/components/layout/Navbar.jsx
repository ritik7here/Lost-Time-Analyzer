import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import { Menu, Bell, Search, LogOut, Sun, Moon } from 'lucide-react';
import { Avatar } from '../common/Avatar';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import '../../styles/layout.css';

export function Navbar({ onMenuClick }) {
=======
import { Menu, Bell, Search, LogOut, Sun, Moon, X, Info } from 'lucide-react';
import { Avatar } from '../common/Avatar';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useNotification } from '../../context/NotificationContext';
import '../../styles/layout.css';

export function Navbar({ onMenuClick }) {
  const [showNotifications, setShowNotifications] = React.useState(false);
>>>>>>> master
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
<<<<<<< HEAD
=======
  const { notifications, unreadCount, markAllAsRead, clearNotifications } = useNotification();
>>>>>>> master
  const pathParts = location.pathname.split('/').filter(Boolean);

  // Format breadcrumb text
  const currentEntity = pathParts.length > 0
    ? pathParts[0].charAt(0).toUpperCase() + pathParts[0].slice(1).replace('-', ' ')
    : 'Dashboard';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

<<<<<<< HEAD
=======
  const handleBellClick = () => {
    setShowNotifications((prev) => !prev);
    if (!showNotifications && unreadCount > 0) {
      markAllAsRead();
    }
  };

>>>>>>> master
  return (
    <header className="navbar">
      <div className="flex items-center gap-4" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          className="md:hidden block btn-outline p-2 rounded-md border-none"
          onClick={onMenuClick}
          style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', display: 'none' /* Will manage vis in CSS later if needed */ }}
        >
          <Menu size={20} />
        </button>

        <div className="breadcrumb">
          <span>Overview</span>
          <span style={{ color: 'var(--text-muted)' }}>/</span>
          <span className="breadcrumb-active">{currentEntity}</span>
        </div>
      </div>

      <div className="navbar-actions">

        <button
          onClick={toggleTheme}
          style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

<<<<<<< HEAD
        <button style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', position: 'relative' }}>
          <Bell size={20} />
          <span style={{ position: 'absolute', top: '-1px', right: '1px', width: '8px', height: '8px', background: 'var(--status-danger)', borderRadius: '50%' }}></span>
        </button>
=======
        <div style={{ position: 'relative' }}>
          <button
            onClick={handleBellClick}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span style={{ position: 'absolute', top: '-1px', right: '1px', width: '8px', height: '8px', background: 'var(--status-danger)', borderRadius: '50%' }}></span>
            )}
          </button>

          {showNotifications && (
            <div style={{
              position: 'absolute',
              top: '100%',
              right: '0',
              marginTop: '8px',
              width: '320px',
              background: 'var(--bg-card)',
              border: '1px solid var(--glass-border)',
              borderRadius: 'var(--border-radius-md)',
              boxShadow: 'var(--shadow-lg)',
              zIndex: 50,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}>
              <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>Notifications</h4>
                {notifications.length > 0 && (
                  <button
                    onClick={clearNotifications}
                    style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '0.75rem', cursor: 'pointer' }}
                  >
                    Clear all
                  </button>
                )}
              </div>
              <div style={{ maxHeight: '300px', overflowY: 'auto', padding: '8px' }}>
                {notifications.length === 0 ? (
                  <div style={{ padding: '16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                    No notifications
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div key={notif.id} style={{ padding: '12px', borderBottom: '1px solid var(--glass-border)', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <Info size={16} style={{ color: notif.type === 'success' ? 'var(--status-success)' : notif.type === 'error' ? 'var(--status-danger)' : 'var(--accent-primary)', flexShrink: 0, marginTop: '2px' }} />
                      <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{notif.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
>>>>>>> master

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', borderLeft: '1px solid var(--glass-border)', paddingLeft: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                {user ? user.name : 'Unknown'}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>
                {user ? user.role : 'Guest'}
              </span>
            </div>
            <Avatar src={`https://ui-avatars.com/api/?name=${user ? user.name.replace(' ', '+') : 'X'}&background=var(--accent-primary)&color=fff`} size="md" />
          </div>

          <button
            onClick={handleLogout}
            title="Logout"
            style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: 'none',
              color: 'var(--status-danger)',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: 'var(--border-radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s'
            }}
            onMouseOver={e => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'}
            onMouseOut={e => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
