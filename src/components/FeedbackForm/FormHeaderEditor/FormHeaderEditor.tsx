import { TextEditor } from '../../TextEditor/TextEditor'
import Input from '../../UI/Input/Input'
import { ContainerBox } from '../../ContainerBox/ContainerBox'

interface FormHeaderEditorProps {
  title: string
  description: string
  onChange: (changes: { title?: string; description?: string }) => void
}

export const FormHeaderEditor = ({
  title,
  description,
  onChange,
}: FormHeaderEditorProps) => {
  return (
    <ContainerBox>
      <h5 className="heading_5 feedback-form-editor__title">
        Редактор формы обратной связи
      </h5>
      <Input
        type="text"
        label="Название формы"
        value={title}
        onChange={e => onChange({ title: e.target.value })}
        placeholder="Введите название формы"
      />
      <TextEditor
        value={description ?? ''}
        label="Описание формы"
        placeholder="Введите описание формы"
        onChange={e => onChange({ description: e.editor.getHTML() })}
      />
    </ContainerBox>
  )
}
