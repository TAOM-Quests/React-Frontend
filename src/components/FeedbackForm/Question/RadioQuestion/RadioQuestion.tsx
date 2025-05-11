import React from 'react'

export const RadioQuestion: React.FC<{
  label: string
  options: string[]
  value?: string
}> = ({ label, options, value }) => (
  <div style={{ marginBottom: 18 }}>
    <div style={{ fontWeight: 600, marginBottom: 6 }}>{label}</div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {options.map(opt => (
        <label
          key={opt}
          style={{
            display: 'flex',
            alignItems: 'center',
            fontWeight: 400,
            fontSize: 15,
            color: '#222',
            gap: 7,
            cursor: 'default',
          }}
        >
          <span
            style={{
              width: 16,
              height: 16,
              borderRadius: '50%',
              border: '2px solid #d1d5db',
              background: value === opt ? '#00B3FF' : '#fff',
              display: 'inline-block',
              marginRight: 7,
            }}
          />
          {opt}
        </label>
      ))}
    </div>
  </div>
)
