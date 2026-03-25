import React, { useEffect } from 'react';
import { X, CheckCircle, AlertTriangle, Info } from 'lucide-react';

export function Toast({ message, type, onClose }) {
  const getStyle = () => {
    switch(type) {
      case 'success': return { bg: 'rgba(16, 185, 129, 0.9)', icon: <CheckCircle size={18} /> };
      case 'error': return { bg: 'rgba(239, 68, 68, 0.9)', icon: <AlertTriangle size={18} /> };
      case 'warning': return { bg: 'rgba(245, 158, 11, 0.9)', icon: <AlertTriangle size={18} /> };
      default: return { bg: 'rgba(59, 130, 246, 0.9)', icon: <Info size={18} /> };
    }
  };

  const current = getStyle();

  return (
    <div style={{
      background: current.bg,
      color: 'white',
      padding: '12px 16px',
      borderRadius: 'var(--border-radius-sm)',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      maxWidth: '350px',
      animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
    }}>
      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
      
      <div>{current.icon}</div>
      <div style={{ fontSize: '0.875rem', fontWeight: 500, flex: 1 }}>{message}</div>
      <button 
        onClick={onClose} 
        style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', padding: 0 }}
      >
        <X size={16} />
      </button>
    </div>
  );
}
