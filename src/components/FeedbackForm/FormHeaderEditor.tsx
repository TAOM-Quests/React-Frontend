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
    <div>
      <label>
        Название формы:
        <input
          type="text"
          value={title}
          onChange={e => onChange({ title: e.target.value })}
          placeholder="Введите название формы"
        />
      </label>
      <br />
      <label>
        Описание формы:
        <textarea
          value={description}
          onChange={e => onChange({ description: e.target.value })}
          placeholder="Введите описание формы"
        />
      </label>
    </div>
  )
}
