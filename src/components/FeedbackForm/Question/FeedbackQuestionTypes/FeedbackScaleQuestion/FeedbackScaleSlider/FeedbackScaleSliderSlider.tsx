import Slider from '@mui/material/Slider'
import { selectAuth } from '../../../../../../redux/auth/authSlice'
import { useAppSelector } from '../../../../../../hooks/redux/reduxHooks'
import classNames from 'classnames'
import './FeedbackScaleSlider.scss'

interface FeedbackScaleSliderProps {
  min: number
  minLabel: string
  max: number
  maxLabel: string
  value: number
  onChange: (val: number) => void
}

export const FeedbackScaleSlider = ({
  min,
  minLabel,
  max,
  maxLabel,
  value,
  onChange,
}: FeedbackScaleSliderProps) => {
  const user = useAppSelector(selectAuth)
  const isEmployee = user?.isEmployee

  const points = Array.from({ length: max }, (_, i) => min + i)
  const marks = points.map(point => ({
    value: point,
    label: point.toString(),
  }))

  return (
    <div
      className={classNames('feedback-scale', {
        'feedback-scale--disabled': isEmployee,
      })}
    >
      <div className="feedback-scale__labels">
        <span className="body_s_sb feedback-scale__label">{minLabel}</span>
        <span className="body_s_sb feedback-scale__label">{maxLabel}</span>
      </div>
      <Slider
        min={min}
        max={min + max - 1}
        step={1}
        value={value}
        onChange={(_, v) => typeof v === 'number' && onChange(v)}
        marks={marks}
        valueLabelDisplay="off"
        className="feedback-scale-slider"
        disabled={isEmployee}
      />
    </div>
  )
}
