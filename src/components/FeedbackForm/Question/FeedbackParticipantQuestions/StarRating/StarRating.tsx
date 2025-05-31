import React, { useState } from 'react'
import './StarRating.scss'
import { Icon } from '../../../../UI/Icon/Icon'

interface StarRatingProps {
  maxRating: number
  value: number
  onChange: (value: number) => void
  readOnly?: boolean // если true — только отображение, без возможности выбора
}

export const StarRating: React.FC<StarRatingProps> = ({
  maxRating,
  value,
  onChange,
  readOnly = false,
}) => {
  const [hovered, setHovered] = useState<number | null>(null)

  const stars = []

  for (let i = 1; i <= maxRating; i++) {
    const isFilled = hovered !== null ? i <= hovered : i <= value

    stars.push(
      <span
        key={i}
        style={{
          cursor: readOnly ? 'default' : 'pointer',
          color: isFilled ? '#ffc107' : '#e4e5e9',
        }}
        onClick={() => !readOnly && onChange(i)}
        onMouseEnter={() => !readOnly && setHovered(i)}
        onMouseLeave={() => !readOnly && setHovered(null)}
        aria-label={`${i} звезда`}
        role="button"
        tabIndex={readOnly ? -1 : 0}
        onKeyDown={e => {
          if (!readOnly && (e.key === 'Enter' || e.key === ' ')) {
            onChange(i)
          }
        }}
      >
        <Icon icon="STAR" />
      </span>,
    )
  }

  return <div>{stars}</div>
}
