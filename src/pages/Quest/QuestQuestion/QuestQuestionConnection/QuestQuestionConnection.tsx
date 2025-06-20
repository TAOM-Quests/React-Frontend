import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { QuestQuestionConnection as QuestQuestionConnectionInterface } from '../../../../models/questQuestion'
import { DragDropProvider, useDraggable } from '@dnd-kit/react'
import { useDroppable } from '@dnd-kit/react'
import { Icon } from '../../../../components/UI/Icon/Icon'
import { isEqual } from 'lodash'
import './QuestQuestionConnection.scss'
import { TypeQuestQuestion } from '../QuestQuestion'
import { ServerFile } from '../../../../models/serverFile'

export interface QuestQuestionConnectionProps {
  question: QuestQuestionConnectionInterface
  isCheckMode: boolean
  setIsAnswerReady: (isAnswerReady: boolean) => void
  userAnswer?: string[]
}

interface DndOption {
  id: number
  text: string
  target: number | null
  image: ServerFile | null
}

export const QuestQuestionConnection = forwardRef(
  (
    {
      question,
      isCheckMode,
      setIsAnswerReady,
      userAnswer: userAnswerProp,
    }: QuestQuestionConnectionProps,
    ref,
  ) => {
    const [userAnswer, setUserAnswer] = useState<string[]>(userAnswerProp ?? [])
    const [dndOptions, setDndOptions] = useState<DndOption[]>(
      userAnswerProp
        ? userAnswerProp.reduce<DndOption[]>((acc, answer) => {
            const [firstPart, secondPart] = answer.split(' - ')

            acc.push({
              id: +firstPart,
              text: question.answer.options[+firstPart],
              image: question.answer.optionsImages[+firstPart],
              target: +secondPart,
            })
            acc.push({
              id: +secondPart,
              text: question.answer.options[+secondPart],
              image: question.answer.optionsImages[+secondPart],
              target: null,
            })

            return acc
          }, [])
        : question.answer.options.map((option, optionIndex) => ({
            id: optionIndex,
            text: option,
            image: question.answer.optionsImages[optionIndex],
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

    const getAnswerType = (option: DndOption): TypeQuestQuestion => {
      if (!isCheckMode) return 'primary'

      const connectedOption = dndOptions.find(o => o.target === option.id)
      const pair1 = `${option.id} - ${connectedOption?.id}`
      const pair2 = `${connectedOption?.id} - ${option.id}`
      const correctPairs = question.answer.correctAnswer
      const isCorrect =
        correctPairs.includes(pair1) || correctPairs.includes(pair2)

      return isCorrect ? 'correct' : 'wrong'
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

    const renderConnectedChildOption = (option: DndOption) => (
      <div key={option.id} className="connected-child-option">
        <span className="body_m_sb connected-child-option__text">
          {option.text}
        </span>
        {option.image && (
          <div className="connected-child-option__image">
            <img src={option.image.url} />
          </div>
        )}
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
              {option.image && (
                <div className="droppable-area__image">
                  <img src={option.image.url} />
                </div>
              )}
              {dndOptions.some(o => o.target === option.id) && (
                <div className="connected-child-option__icon">
                  <Icon
                    icon="CROSS"
                    disabled={isCheckMode}
                    onClick={() => removeConnection(option.id)}
                  />
                </div>
              )}
            </Droppable>
            {dndOptions.some(o => o.target === option.id) &&
              renderConnectedChildOption(
                dndOptions.find(o => o.target === option.id)!,
              )}
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
        ref={disabled ? null : ref}
        className={`draggable ${disabled ? 'draggable--disabled' : ''} ${className || ''}`}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    </>
  )
}
