import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { QuestQuestionConnection as QuestQuestionConnectionInterface } from '../../../../models/questQuestion'
import { DragDropProvider, useDraggable } from '@dnd-kit/react'
import { useDroppable } from '@dnd-kit/react'
import { Icon } from '../../../../components/UI/Icon/Icon'

export interface QuestQuestionConnectionProps {
  isCheckMode: boolean
  question: QuestQuestionConnectionInterface
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

    useImperativeHandle(ref, () => ({ userAnswer }), [userAnswer])
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

    const removeConnection = (optionIndex: number) => {
      setDndOptions(
        dndOptions.map(option =>
          option.id === optionIndex ? { ...option, target: null } : option,
        ),
      )
    }

    const renderConnectedChildOption = (text: string, optionIndex: number) => (
      <div
        key={optionIndex}
        style={{
          width: 100,
          height: 100,
          backgroundColor: 'yellow',
        }}
      >
        {text}
        <Icon icon="CROSS" onClick={() => removeConnection(optionIndex)} />
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
            style={{ width: 300, height: 300, backgroundColor: 'red' }}
          >
            <Droppable
              id={optionIndex.toString()}
              style={{ width: 200, height: 200, backgroundColor: 'green' }}
            >
              {dndOptions.map(option => {
                if (option.target === optionIndex) {
                  return renderConnectedChildOption(option.text, option.id)
                }
              })}
            </Droppable>
          </Draggable>
        )
      }
    }

    return (
      <DragDropProvider onDragEnd={e => dropHandler(e.operation)}>
        {dndOptions.map((option, optionIndex) =>
          renderOption(option, optionIndex),
        )}
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
