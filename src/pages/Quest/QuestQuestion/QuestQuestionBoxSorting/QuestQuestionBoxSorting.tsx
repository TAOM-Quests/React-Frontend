import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import {
  QuestQuestionBoxSortingAnswer,
  QuestQuestionBoxSorting as QuestQuestionBoxSortingInterface,
} from '../../../../models/questQuestion'
import { DragDropProvider, useDraggable, useDroppable } from '@dnd-kit/react'

export interface QuestQuestionBoxSortingProps {
  isCheckMode: boolean
  question: QuestQuestionBoxSortingInterface
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

    useImperativeHandle(ref, () => ({ userAnswer }), [userAnswer])
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
      <DragDropProvider onDragEnd={e => dropHandler(e.operation)}>
        {question.answer.correctAnswer.map((box, boxIndex) => (
          <div key={boxIndex}>
            <Droppable
              id={`box-${boxIndex}`}
              disabled={isCheckMode}
              style={{ width: 100, height: 100, backgroundColor: 'green' }}
            >
              {box.name}
              {userAnswer[boxIndex].options.map((option, optionIndex) => (
                <Draggable key={optionIndex} id={`option-${optionIndex}`}>
                  {question.answer.options[option]}
                </Draggable>
              ))}
            </Droppable>
          </div>
        ))}
        {question.answer.options.map((option, optionIndex) => {
          if (!userAnswer.find(box => box.options.includes(optionIndex))) {
            return (
              <Draggable
                key={optionIndex}
                disabled={isCheckMode}
                id={`option-${optionIndex}`}
              >
                {option}
              </Draggable>
            )
          }
        })}
      </DragDropProvider>
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

export function Draggable({ id, text, children, ...props }: any) {
  const { ref } = useDraggable({
    id,
  })

  return (
    <button ref={ref} {...props}>
      {text}
      {children}
    </button>
  )
}
