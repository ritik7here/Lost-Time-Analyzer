import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, UserPlus, FileWarning, Trophy } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import '../../styles/layout.css';

const NAV_ITEMS = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard, roles: ['faculty', 'student'] },
  { path: '/students', label: 'Students', icon: Users, roles: ['faculty'] },
  { path: '/compare', label: 'Compare', icon: UserPlus, roles: ['faculty'] },
  { path: '/at-risk', label: 'At-Risk', icon: FileWarning, roles: ['faculty'] },
  { path: '/leaderboard', label: 'Leaderboard', icon: Trophy, roles: ['faculty', 'student'] },
];

export function Sidebar({ mobileOpen = false, setMobileOpen }) {
  const { user } = useAuth();
  const userRole = user ? user.role : 'student'; // Fallback

  const visibleItems = NAV_ITEMS.filter(item => item.roles.includes(userRole));

  return (
    <aside className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <LayoutDashboard size={24} />
        </div>
        <h2 className="text-xl font-bold m-0 tracking-tight" style={{ margin: 0 }}>LTA</h2>
      </div>

      <nav className="sidebar-nav">
        {visibleItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen && setMobileOpen(false)}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
