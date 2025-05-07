import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import {
  QuestQuestionBoxSortingAnswer,
  QuestQuestionBoxSorting as QuestQuestionBoxSortingInterface,
} from '../../../../models/questQuestion'
import { DragDropProvider, useDraggable, useDroppable } from '@dnd-kit/react'
import { isEqual } from 'lodash'
import './QuestQuestionBoxSorting.scss'

import classNames from 'classnames'
import { getOptionColorAnswerBoxSorting } from './OptionColorAnswerBoxSorting'

export interface QuestQuestionBoxSortingProps {
  question: QuestQuestionBoxSortingInterface
  isCheckMode: boolean
  setIsAnswerReady: (isAnswerReady: boolean) => void
}

export const QuestQuestionBoxSorting = forwardRef(
  (
    { isCheckMode, question, setIsAnswerReady }: QuestQuestionBoxSortingProps,
    ref,
  ) => {
    const [userAnswer, setUserAnswer] = useState<
      QuestQuestionBoxSortingAnswer[]
    >(
      question.answer.correctAnswer.map(box => ({
        name: box.name,
        options: [],
      })),
    )

    useImperativeHandle(
      ref,
      () => ({
        userAnswer,
        isCorrectAnswer: isEqual(userAnswer, question.answer.correctAnswer),
      }),
      [userAnswer],
    )
    useEffect(
      () =>
        setIsAnswerReady(
          userAnswer.reduce((acc, box) => acc + box.options.length, 0) ===
            question.answer.correctAnswer.reduce(
              (acc, box) => acc + box.options.length,
              0,
            ),
        ),
      [userAnswer],
    )

    const dropHandler = (e: any) => {
      if (e.canceled) return

      console.log('Event', e)

      setUserAnswer(
        userAnswer.map((box, boxIndex) => {
          const targetType = e.target?.id?.split('-')[0]
          const targetIndex = +e.target?.id?.split('-')[1]
          const sourceType = e.source?.id?.split('-')[0]
          const sourceIndex = +e.source?.id?.split('-')[1]
          if (targetType !== 'box' || sourceType !== 'option') return box

          if (boxIndex === targetIndex) {
            return {
              ...box,
              options: [...box.options, sourceIndex],
            }
          } else if (box.options.includes(sourceIndex)) {
            return {
              ...box,
              options: box.options.filter(option => option !== sourceIndex),
            }
          } else {
            return box
          }
        }),
      )
    }

    return (
      <div className="quest-question-box-sorting">
        <DragDropProvider onDragEnd={e => dropHandler(e.operation)}>
          <div className="quest-question-box-sorting__boxes">
            {question.answer.correctAnswer.map((box, boxIndex) => (
              <div
                key={boxIndex}
                className={classNames(
                  'quest-question-box-sorting__box',
                  isCheckMode
                    ? 'quest-question-box-sorting__box--disabled'
                    : '',
                )}
              >
                <div className="quest-question-box-sorting__box--name">
                  <p className="body_m_r">{box.name}</p>
                </div>
                <Droppable
                  id={`box-${boxIndex}`}
                  disabled={isCheckMode}
                  className={classNames(
                    'quest-question-box-sorting__box--droppable',
                  )}
                >
                  {userAnswer[boxIndex].options.map((option, optionIndex) => {
                    const colorType = getOptionColorAnswerBoxSorting(
                      boxIndex,
                      option,
                      userAnswer,
                      question.answer.correctAnswer,
                      isCheckMode,
                    )
                    return (
                      <Draggable
                        key={optionIndex}
                        id={`option-${optionIndex}`}
                        className={classNames(
                          'sorting-item',
                          'sorting-item--placed',
                          `sorting-item--${colorType}`,
                        )}
                      >
                        {question.answer.options[option]}
                      </Draggable>
                    )
                  })}
                </Droppable>
              </div>
            ))}
          </div>

          <div className="quest-question-box-sorting__options">
            {question.answer.options.map((option, optionIndex) => {
              const isPlaced = !!userAnswer.find(box =>
                box.options.includes(optionIndex),
              )

              if (!isPlaced) {
                return (
                  <Draggable
                    key={optionIndex}
                    disabled={isCheckMode}
                    id={`option-${optionIndex}`}
                    className={classNames('sorting-item', {
                      'sorting-item--placed': isPlaced,
                    })}
                  >
                    {option}
                  </Draggable>
                )
              }
            })}
          </div>
        </DragDropProvider>
      </div>
    )
  },
)

function Droppable({ id, children, ...props }: any) {
  const { ref } = useDroppable({
    id,
  })

  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  )
}

export function Draggable({ id, children, className, ...props }: any) {
  const { ref } = useDraggable({
    id,
  })

  return (
    <div className={classNames(className, 'body_m_m')} ref={ref} {...props}>
      <p>{children}</p>
    </div>
  )
}
