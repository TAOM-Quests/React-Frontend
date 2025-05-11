import React from 'react'

export const TextQuestion: React.FC<{
  label: string
  placeholder?: string
  value?: string
}> = ({ label, placeholder = '', value = '' }) => (
  <div style={{ marginBottom: 18 }}>
    <div style={{ fontWeight: 600, marginBottom: 6 }}>{label}</div>
    <div style={{ fontSize: 13, color: '#999', marginBottom: 4 }}>
      {placeholder}
    </div>
    <div
      style={{
        width: '100%',
        minHeight: 44,
        background: '#f5f5f5',
        borderRadius: 8,
        border: '1px solid #e2e8f0',
        padding: 8,
        color: '#bbb',
      }}
    >
      {value || 'Комментарий'}
    </div>
  </div>
)
