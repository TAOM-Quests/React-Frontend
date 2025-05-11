import React from 'react'

export const ScaleQuestion: React.FC<{
  label: string
  minLabel?: string
  maxLabel?: string
  value?: number
  max?: number
}> = ({
  label,
  minLabel = 'полностью не согласен',
  maxLabel = 'полностью согласен',
  value = 3,
  max = 5,
}) => (
  <div style={{ marginBottom: 18 }}>
    <div style={{ fontWeight: 600, marginBottom: 6 }}>{label}</div>
    <div style={{ margin: '10px 0 0 0', position: 'relative' }}>
      <div
        style={{
          width: '100%',
          height: 4,
          background: '#e2e8f0',
          borderRadius: 2,
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            position: 'absolute',
            left: 0,
            right: 0,
            top: -6,
          }}
        >
          {Array.from({ length: max }).map((_, i) => (
            <span
              key={i}
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: i + 1 === value ? '#00B3FF' : '#e2e8f0',
                display: 'inline-block',
              }}
            />
          ))}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 13,
          color: '#7d8592',
          marginTop: 6,
        }}
      >
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  </div>
)
