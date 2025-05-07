import classNames from 'classnames'
import { ButtonHTMLAttributes, ReactNode } from 'react'
import { TypeQuestQuestion } from '../QuestQuestion'
import './QuestQuestionButton.scss'

export type Size = 'extraLarge' | 'large'

export interface QuestQuestionButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  size?: Size
  children?: ReactNode
  colorType?: TypeQuestQuestion | { color: string; backgroundColor: string }
}

export const QuestQuestionButton = ({
  text,
  size = 'extraLarge',
  colorType = 'primary',
  children,
  ...props
}: QuestQuestionButtonProps) => {
  return (
    <button
      className={classNames(
        'body_m_r',
        'quest-question-button',
        typeof colorType === 'string'
          ? `quest-question-button--${colorType}`
          : '',
        `quest-question-button--${size}`,
        props.className,
      )}
      style={
        typeof colorType !== 'string'
          ? {
              backgroundColor: colorType.backgroundColor,
              color: colorType.color,
            }
          : {}
      }
      {...props}
    >
      {children && children}
      {!children && text && text}
    </button>
  )
}
