import { useState } from 'react'
import { Icon } from '../../../../UI/Icon/Icon'
import './FeedbackStarRating.scss'
import { selectAuth } from '../../../../../redux/auth/authSlice'
import { useAppSelector } from '../../../../../hooks/redux/reduxHooks'

interface FeedbackStarRatingProps {
  value: number
  maxRating: number
  onChange: (value: number) => void
}

export const FeedbackStarRating = ({
  value,
  maxRating,
  onChange,
}: FeedbackStarRatingProps) => {
  const [hovered, setHovered] = useState<number | null>(null)

  const user = useAppSelector(selectAuth)
  const isEmployee = user?.isEmployee

  const stars = []

  for (let i = 1; i <= maxRating; i++) {
    const isFilled = hovered !== null ? i <= hovered : i <= value

    stars.push(
      <Icon
        icon={isFilled ? 'STAR_SHADED' : 'STAR'}
        key={i}
        colorIcon="subdued"
        className="star-rating__star"
        onClick={() => onChange(i)}
        onMouseEnter={isEmployee ? undefined : () => setHovered(i)}
        onMouseLeave={isEmployee ? undefined : () => setHovered(null)}
        aria-label={`${i} звезда`}
        role="button"
        tabIndex={0}
        disabled={isEmployee}
      />,
    )
  }

  return <div className="star-rating">{stars}</div>
}
