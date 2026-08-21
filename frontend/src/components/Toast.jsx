import React from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose }) => {
  if (!message) return null;

  return (
    <div className="toast-container">
      <div className="toast" style={{ borderColor: type === 'error' ? '#ef4444' : 'var(--border-active)' }}>
        {type === 'error' ? (
          <AlertCircle size={20} style={{ color: '#ef4444' }} />
        ) : (
          <CheckCircle2 size={20} style={{ color: 'var(--accent-emerald)' }} />
        )}
        <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>{message}</span>
        {onClose && (
          <button onClick={onClose} style={{ marginLeft: '12px', color: 'var(--text-muted)' }}>
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Toast;
