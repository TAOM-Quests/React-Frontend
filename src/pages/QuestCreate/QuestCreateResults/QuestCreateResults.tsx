import { ContainerBox } from '../../../components/ContainerBox/ContainerBox'
import { TextEditor } from '../../../components/TextEditor/TextEditor'
import { Button } from '../../../components/UI/Button/Button'
import { Icon } from '../../../components/UI/Icon/Icon'
import Input from '../../../components/UI/Input/Input'
import { NumberInput } from '../../../components/UI/NumberInput/NumberInput'
import { QuestResult } from '../../../models/questResult'

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
    <ContainerBox>
      <h2>Результаты квеста</h2>
      {results.map((result, resultIndex) => (
        <div key={resultIndex}>
          <Icon icon="CROSS" onClick={() => removeResult(resultIndex)} />
          <Input
            label="Название"
            value={result.name}
            onChange={e =>
              updateResult({ ...result, name: e.target.value }, resultIndex)
            }
          />
          <NumberInput
            min={0}
            value={result.minPoints}
            label="Минимальное количество правильных ответов"
            onChange={minPoints =>
              updateResult(
                { ...result, minPoints: minPoints ?? 0 },
                resultIndex,
              )
            }
          />
          <TextEditor
            value={result.description}
            onChange={description =>
              updateResult(
                { ...result, description: description.editor.getHTML() ?? '' },
                resultIndex,
              )
            }
          />
        </div>
      ))}
      <Button
        iconAfter="ADD"
        text="Добавить"
        onClick={addResult}
        colorType={'secondary'}
      />
    </ContainerBox>
  )
}
