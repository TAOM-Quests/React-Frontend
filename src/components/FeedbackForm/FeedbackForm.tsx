import React, { useState, useEffect } from 'react'
import { FeedbackQuestion, FeedbackType } from './feedbackFormConfig'
import { FeedbackPreview } from '../../components/FeedbackForm/FeedbackPreview/FeedbackPreview'
import { ContainerBox } from '../ContainerBox/ContainerBox'
import Input from '../UI/Input/Input'
import { Icon } from '../UI/Icon/Icon'
import classNames from 'classnames'
import { Toggle } from '../UI/Toggle/Toggle'
import { Button } from '../UI/Button/Button'

interface FeedbackSection {
  id: string
  title: string
  questions: FeedbackQuestion[]
}

interface FeedbackFormProps {
  type: FeedbackType
  title: string
  subtitle: string
  sections: FeedbackSection[]
  onChange?: (sections: FeedbackSection[]) => void
}

export const FeedbackForm: React.FC<FeedbackFormProps> = ({
  type,
  title,
  subtitle,
  sections: initialSections,
  onChange,
}) => {
  const [sections, setSections] = useState<FeedbackSection[]>(initialSections)

  useEffect(() => {
    onChange?.(sections)
  }, [sections, onChange])

  // Добавить раздел
  const addSection = () => {
    setSections(prev => [
      ...prev,
      {
        id: Math.random().toString(36).slice(2),
        title: '',
        questions: [],
      },
    ])
  }

  // Удалить раздел
  const removeSection = (sectionId: string) => {
    setSections(prev => prev.filter(sec => sec.id !== sectionId))
  }

  // Изменить название раздела
  const handleSectionTitle = (sectionId: string, value: string) => {
    setSections(prev =>
      prev.map(sec => (sec.id === sectionId ? { ...sec, title: value } : sec)),
    )
  }

  // Добавить вопрос
  const addQuestion = (sectionId: string, type: 'text' | 'scale') => {
    setSections(prev =>
      prev.map(sec =>
        sec.id === sectionId
          ? {
              ...sec,
              questions: [
                ...sec.questions,
                {
                  id: Math.random().toString(36).slice(2),
                  type,
                  label: '',
                  minLabel:
                    type === 'scale' ? 'полностью не согласен' : undefined,
                  maxLabel: type === 'scale' ? 'полностью согласен' : undefined,
                } as FeedbackQuestion,
              ],
            }
          : sec,
      ),
    )
  }

  // Удалить вопрос
  const removeQuestion = (sectionId: string, questionId: string) => {
    setSections(prev =>
      prev.map(sec =>
        sec.id === sectionId
          ? {
              ...sec,
              questions: sec.questions.filter(q => q.id !== questionId),
            }
          : sec,
      ),
    )
  }

  // Изменить label вопроса
  const handleQuestionLabel = (
    sectionId: string,
    questionId: string,
    value: string,
  ) => {
    setSections(prev =>
      prev.map(sec =>
        sec.id === sectionId
          ? {
              ...sec,
              questions: sec.questions.map(q =>
                q.id === questionId ? { ...q, label: value } : q,
              ),
            }
          : sec,
      ),
    )
  }

  // Изменить текст вопроса (для типа text)
  const handleQuestionText = (
    sectionId: string,
    questionId: string,
    value: string,
  ) => {
    setSections(prev =>
      prev.map(sec =>
        sec.id === sectionId
          ? {
              ...sec,
              questions: sec.questions.map(q =>
                q.id === questionId ? { ...q, question: value } : q,
              ),
            }
          : sec,
      ),
    )
  }

  // Изменить подписи шкалы
  const handleScaleLabel = (
    sectionId: string,
    questionId: string,
    isMin: boolean,
    value: string,
  ) => {
    setSections(prev =>
      prev.map(sec =>
        sec.id === sectionId
          ? {
              ...sec,
              questions: sec.questions.map(q =>
                q.id === questionId && q.type === 'scale'
                  ? isMin
                    ? { ...q, minLabel: value }
                    : { ...q, maxLabel: value }
                  : q,
              ),
            }
          : sec,
      ),
    )
  }

  return (
    <div>
      {/* Превью стандартных вопросов */}
      <FeedbackPreview type={type} title={title} subtitle={subtitle} />

      <ContainerBox className="event-feedback">
        {sections.map(section => (
          <div className="event-feedback__section" key={section.id}>
            <div className="event-feedback__section--header">
              <Input
                value={section.title}
                onChange={e => handleSectionTitle(section.id, e.target.value)}
                label="Название раздела"
                placeholder="Введите название раздела"
              />
              <Icon icon="DELETE" onClick={() => removeSection(section.id)} />
            </div>

            {section.questions.length > 0 && (
              <div className="event-feedback__questions">
                {section.questions.map(q => (
                  <div
                    key={q.id}
                    className={classNames(
                      'event-feedback__questions--item',
                      q.type === 'scale' &&
                        'event-feedback__questions--item--scale',
                    )}
                  >
                    <div
                      className={classNames(
                        'event-feedback__question',
                        q.type === 'scale' && 'event-feedback__question--scale',
                      )}
                    >
                      <Input
                        value={q.question ?? ''}
                        onChange={e =>
                          handleQuestionText(section.id, q.id, e.target.value)
                        }
                        label="Вопрос"
                        placeholder="Введите вопрос"
                        className="event-feedback__question-input"
                      />

                      {q.type === 'scale' && (
                        <div className="event-feedback__scale">
                          <span className="body_m_m">{q.scaleMin ?? 1}</span>
                          <Input
                            value={q.scaleLabels?.[0] ?? ''}
                            onChange={e =>
                              handleScaleLabel(
                                section.id,
                                q.id,
                                Boolean(0),
                                e.target.value,
                              )
                            }
                            placeholder="Левая подпись"
                            className="event-feedback__scale-label"
                          />
                          <span className="body_m_m">{q.scaleMax ?? 5}</span>
                          <Input
                            value={q.scaleLabels?.[1] ?? ''}
                            onChange={e =>
                              handleScaleLabel(
                                section.id,
                                q.id,
                                Boolean(1),
                                e.target.value,
                              )
                            }
                            placeholder="Правая подпись"
                            className="event-feedback__scale-label"
                          />
                        </div>
                      )}
                    </div>
                    <div
                      className={classNames(
                        q.type === 'scale'
                          ? 'event-feedback__question--scale-actions'
                          : 'event-feedback__question--actions',
                      )}
                    >
                      {/* Здесь можно реализовать Toggle, если нужно */}
                      <Toggle
                        onChange={() => {
                          /* Реализуйте логику, если нужно */
                        }}
                      />
                      <Icon
                        icon="CROSS"
                        onClick={() => removeQuestion(section.id, q.id)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="event-feedback__section--actions">
              <Button
                text="Добавить вопрос"
                iconBefore="PLUS"
                colorType="secondary"
                size="small"
                onClick={() => addQuestion(section.id, 'text')}
                className="event-feedback__add-question"
              />
              <Button
                text="Добавить шкалу"
                iconBefore="PLUS"
                colorType="secondary"
                size="small"
                onClick={() => addQuestion(section.id, 'scale')}
                className="event-feedback__add-scale"
              />
            </div>
            <div className="lineDash"></div>
          </div>
        ))}
        <Button
          text="Добавить раздел"
          iconBefore="PLUS"
          size="small"
          colorType="secondary"
          onClick={addSection}
          className="event-feedback__add-section"
        />
      </ContainerBox>
    </div>
  )
}
