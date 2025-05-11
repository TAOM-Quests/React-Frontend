import React from 'react'

export const RatingQuestion: React.FC<{
  label: string
  value?: number
  max?: number
}> = ({ label, value = 0, max = 5 }) => (
  <div style={{ marginBottom: 18 }}>
    <div style={{ fontWeight: 600, marginBottom: 6 }}>{label}</div>
    <div>
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          style={{
            fontSize: 28,
            color: i < value ? '#00B3FF' : '#E2E8F0',
            marginRight: 2,
            verticalAlign: 'middle',
          }}
        >
          ★
        </span>
      ))}
    </div>
  </div>
)
