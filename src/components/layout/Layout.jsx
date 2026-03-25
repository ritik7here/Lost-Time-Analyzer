import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import '../../styles/layout.css';

export function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="layout-wrapper">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      
      <main className="main-content">
        <Navbar onMenuClick={() => setMobileOpen(!mobileOpen)} />
        <div className="page-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
