import { ContainerBox } from '../../../components/ContainerBox/ContainerBox'
import { TextEditor } from '../../../components/TextEditor/TextEditor'
import { Button } from '../../../components/UI/Button/Button'
import { Icon } from '../../../components/UI/Icon/Icon'
import Input from '../../../components/UI/Input/Input'
import { NumberInput } from '../../../components/UI/NumberInput/NumberInput'
import { QuestResult } from '../../../models/questResult'
import './QuestCreateResults.scss'

export interface QuestCreateResultsProps {
  results: QuestResult[]
  setResults: (results: QuestResult[]) => void
}

export const QuestCreateResults = ({
  results,
  setResults,
}: QuestCreateResultsProps) => {
  const updateResult = (result: QuestResult, index: number) => {
    setResults(results.map((r, i) => (i === index ? result : r)))
  }

  const addResult = () =>
    setResults([...results, { name: '', minPoints: 0, description: '' }])

  const removeResult = (index: number) =>
    setResults(results.filter((_, i) => i !== index))

  return (
    <ContainerBox className="quest-create-results">
      <p className="body_xl_sb quest-create-results__title">
        Результаты квеста
      </p>
      {results.map((result, resultIndex) => (
        <div key={resultIndex} className="quest-create-results__result">
          <div className="quest-create-results__result--container">
            <div className="quest-create-results__result--content">
              <div className="quest-create-results__result--inputsMini">
                <Input
                  label="Название"
                  placeholder="Введите название"
                  value={result.name}
                  onChange={e =>
                    updateResult(
                      { ...result, name: e.target.value },
                      resultIndex,
                    )
                  }
                />
                <NumberInput
                  min={0}
                  value={result.minPoints}
                  label="Мин кол-во верных ответов"
                  placeholder="0..."
                  onChange={minPoints =>
                    updateResult(
                      { ...result, minPoints: minPoints ?? 0 },
                      resultIndex,
                    )
                  }
                />
              </div>
              <TextEditor
                value={result.description}
                label="Описание"
                placeholder="Введите описание"
                onChange={description =>
                  updateResult(
                    {
                      ...result,
                      description: description.editor.getHTML() ?? '',
                    },
                    resultIndex,
                  )
                }
              />
            </div>

            <Icon icon="DELETE" onClick={() => removeResult(resultIndex)} />
          </div>
          <div className="lineDash"></div>
        </div>
      ))}
      <div>
        <Button
          iconAfter="ADD"
          text="Добавить"
          size="small"
          onClick={addResult}
          colorType={'secondary'}
        />
      </div>
    </ContainerBox>
  )
}
