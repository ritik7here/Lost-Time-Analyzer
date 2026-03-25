import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';
import '../styles/pages.css';

export function UploadData() {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { addNotification } = useNotification();

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelected(e.target.files[0]);
    }
  };

  const handleFileSelected = (selectedFile) => {
    if (selectedFile.type !== 'text/csv' && !selectedFile.name.endsWith('.csv')) {
      addNotification('Please upload a valid CSV file.', 'error');
      return;
    }
    setFile(selectedFile);
  };

  const handleUpload = () => {
    if (!file) return;

    setIsUploading(true);

    // Simulate file upload process
    setTimeout(() => {
      setIsUploading(false);
      setFile(null);
      addNotification(`Successfully uploaded ${file.name}`, 'success');

      // Simulate another notification for data processing
      setTimeout(() => {
        addNotification('Data processing completed. Student records updated.', 'info');
      }, 1500);

    }, 2000);
  };

  return (
    <div className="page-container" style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '8px' }}>
          Upload Student Data
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Upload a CSV file containing student records, scores, or attendance data to update the dashboard.
        </p>
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          border: `2px dashed ${isDragging ? 'var(--accent-primary)' : 'var(--glass-border)'}`,
          borderRadius: 'var(--border-radius-lg)',
          padding: '48px 24px',
          textAlign: 'center',
          backgroundColor: isDragging ? 'rgba(79, 70, 229, 0.05)' : 'var(--bg-card)',
          transition: 'all 0.2s ease',
          cursor: 'pointer',
          marginBottom: '24px'
        }}
        onClick={() => document.getElementById('csv-file-input').click()}
      >
        <input
          type="file"
          id="csv-file-input"
          accept=".csv"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />

        {file ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <FileText size={48} style={{ color: 'var(--accent-primary)' }} />
            <div>
              <p style={{ margin: 0, fontWeight: 500, color: 'var(--text-primary)' }}>{file.name}</p>
              <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <Upload size={48} style={{ color: 'var(--text-muted)' }} />
            <div>
              <p style={{ margin: 0, fontWeight: 500, color: 'var(--text-primary)' }}>
                Drag and drop your CSV file here
              </p>
              <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                or click to browse from your computer
              </p>
            </div>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
        {file && (
          <button
            onClick={() => setFile(null)}
            className="btn-outline"
            disabled={isUploading}
            style={{ padding: '8px 16px', borderRadius: 'var(--border-radius-md)' }}
          >
            Cancel
          </button>
        )}
        <button
          onClick={handleUpload}
          className="btn-primary"
          disabled={!file || isUploading}
          style={{
            padding: '8px 24px',
            borderRadius: 'var(--border-radius-md)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            opacity: (!file || isUploading) ? 0.5 : 1,
            cursor: (!file || isUploading) ? 'not-allowed' : 'pointer'
          }}
        >
          {isUploading ? (
            <>
              <div style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
              Uploading...
            </>
          ) : (
            <>
              <Upload size={18} />
              Process Data
            </>
          )}
        </button>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}} />
    </div>
  );
}
