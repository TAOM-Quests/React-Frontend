import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { QuestQuestionConnection as QuestQuestionConnectionInterface } from '../../../../models/questQuestion'
import { DragDropProvider, useDraggable } from '@dnd-kit/react'
import { useDroppable } from '@dnd-kit/react'
import { Icon } from '../../../../components/UI/Icon/Icon'
import { isEqual } from 'lodash'
import './QuestQuestionConnection.scss'
import { TypeAnswer } from '../QuestQuestion'

export interface QuestQuestionConnectionProps {
  question: QuestQuestionConnectionInterface
  isCheckMode: boolean
  setIsAnswerReady: (isAnswerReady: boolean) => void
}

interface DndOption {
  id: number
  text: string
  target: number | null
}

export const QuestQuestionConnection = forwardRef(
  (
    { question, isCheckMode, setIsAnswerReady }: QuestQuestionConnectionProps,
    ref,
  ) => {
    const [userAnswer, setUserAnswer] = useState<string[]>([])
    const [dndOptions, setDndOptions] = useState<DndOption[]>(
      question.answer.options.map((option, optionIndex) => ({
        id: optionIndex,
        text: option,
        target: null,
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
      () => setIsAnswerReady(userAnswer.length === dndOptions.length / 2),
      [userAnswer],
    )
    useEffect(
      () =>
        setUserAnswer(
          dndOptions
            .filter(option => option.target !== null)
            .map(option => `${option.target} - ${option.id}`),
        ),
      [dndOptions],
    )

    const dropHandler = (e: any) => {
      if (e.canceled) return

      setDndOptions(
        dndOptions.map((option, optionIndex) =>
          //Drop option - option в который помещают drag option (e.source)
          //Drag option - option, который взят пользователем для перемещения (e.target)
          e.target?.id && //Drop имеет id
          option.target === null && //Итерируемый option ни к чему не прикреплен
          +e.source?.id == optionIndex && //Итерируемый option является drag option
          +e.target?.id !== optionIndex && //Итерируемый option не является drop option
          !dndOptions.find(o => o.target === optionIndex) && //Итерируемый option не является другому drop option
          !dndOptions.find(o => o.target === +e.target?.id) //Drop option не является другим drop option
            ? { ...option, target: +e.target?.id }
            : option,
        ),
      )
    }

    const getAnswerType = (option: DndOption): TypeAnswer => {
      const connectedOption = dndOptions.find(o => o.target === option.id)
      const pair1 = `${option.id} - ${connectedOption?.id}`
      const pair2 = `${connectedOption?.id} - ${option.id}`
      const correctPairs = question.answer.correctAnswer

      if (isCheckMode) {
        const isCorrect =
          correctPairs.includes(pair1) || correctPairs.includes(pair2)
        return isCorrect ? 'correct' : 'wrong'
      }

      return 'secondary'
    }

    const removeConnection = (optionId: number) => {
      setDndOptions(prevOptions =>
        prevOptions.map(option =>
          // Если опция подключена к optionId, или сама optionId, сбрасываем target
          option.id === optionId || option.target === optionId
            ? { ...option, target: null }
            : option,
        ),
      )
    }

    const renderConnectedChildOption = (text: string, optionIndex: number) => (
      <div key={optionIndex} className="connected-child-option">
        <span className="body_m_sb connected-child-option__text">{text}</span>
      </div>
    )

    const renderOption = (option: DndOption, optionIndex: number) => {
      if (option.target === null) {
        return (
          <Draggable
            key={optionIndex}
            text={option.text}
            disabled={isCheckMode}
            id={`${optionIndex}`}
            className={`draggable--${getAnswerType(option)}`}
          >
            <Droppable id={optionIndex.toString()} className={`droppable-area`}>
              <span className="body_m_sb droppable-area__text">
                {option.text}
              </span>
              {(option.target !== null ||
                dndOptions.some(o => o.target === option.id)) && (
                <div className="connected-child-option__icon">
                  <Icon
                    icon="CROSS"
                    disabled={isCheckMode}
                    onClick={() => removeConnection(option.id)}
                  />
                </div>
              )}
            </Droppable>

            {dndOptions.map(option => {
              if (option.target === optionIndex) {
                return renderConnectedChildOption(option.text, option.id)
              }
            })}
          </Draggable>
        )
      }
    }

    return (
      <DragDropProvider onDragEnd={e => dropHandler(e.operation)}>
        <div className="quest-question-connection">
          {dndOptions.map((option, optionIndex) =>
            renderOption(option, optionIndex),
          )}
        </div>
      </DragDropProvider>
    )
  },
)

function Droppable({ id, children, className, ...props }: any) {
  const { ref } = useDroppable({
    id,
  })

  return (
    <div ref={ref} className={`droppable ${className || ''}`} {...props}>
      {children}
    </div>
  )
}

export function Draggable({
  id,

  children,
  disabled,
  className,
  ...props
}: any) {
  const { ref } = useDraggable({
    id,
  })

  return (
    <>
      <button
        ref={ref}
        className={`draggable ${disabled ? 'draggable--disabled' : ''} ${className || ''}`}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    </>
  )
}
