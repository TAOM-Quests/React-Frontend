import { ContentMatch } from '@tiptap/pm/model'
import { TextEditor } from '../../TextEditor/TextEditor'
import Input from '../../UI/Input/Input'
import './FormHeaderEditor.scss'
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
