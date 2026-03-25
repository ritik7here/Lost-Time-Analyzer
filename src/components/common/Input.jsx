import React from 'react';
import { cn } from '../../utils/cn';

export function Input({ label, id, className, style, ...props }) {
  return (
    <div className="input-wrapper">
      {label && <label htmlFor={id} style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '4px' }}>{label}</label>}
      <input
        id={id}
        {...props}
        style={{
          width: '100%',
          padding: '12px 16px',
          borderRadius: '12px',
          border: '1px solid var(--border, #334155)',
          background: 'var(--bg-secondary)',
          color: 'var(--text-primary)',
          fontSize: '1rem',
          outline: 'none',
          transition: 'all 0.2s',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
          boxSizing: 'border-box',
          ...style
        }}
        onFocus={(e) => { e.target.style.borderColor = 'var(--accent-primary)'; e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.2)'; }}
        onBlur={(e) => { e.target.style.borderColor = 'var(--border, #334155)'; e.target.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.02)'; }}
      />
    </div>
  );
}

export function Select({ label, id, options, className, style, ...props }) {
  return (
    <div className="input-wrapper">
      {label && <label htmlFor={id} style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '4px' }}>{label}</label>}
      <select
        id={id}
        {...props}
        style={{
          width: '100%',
          padding: '12px 16px',
          paddingRight: '36px',
          borderRadius: '12px',
          border: '1px solid var(--border, #334155)',
          background: 'var(--bg-secondary)',
          color: 'var(--text-primary)',
          fontSize: '1rem',
          outline: 'none',
          transition: 'all 0.2s',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
          appearance: 'none',
          backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2394a3b8%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 14px top 50%',
          backgroundSize: '10px auto',
          boxSizing: 'border-box',
          ...style
        }}
        onFocus={(e) => { e.target.style.borderColor = 'var(--accent-primary)'; e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.2)'; }}
        onBlur={(e) => { e.target.style.borderColor = 'var(--border, #334155)'; e.target.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.02)'; }}
      >
        {options.map((opt, i) => (
          <option key={i} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}
