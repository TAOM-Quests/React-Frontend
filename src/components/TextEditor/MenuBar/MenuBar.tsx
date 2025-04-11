import { Editor } from '@tiptap/react'

export interface MenuBarProps {
  editor: Editor
}

interface EditorAction {
  text: string
  onClick: () => void
}

export const MenuBar = ({ editor }: MenuBarProps) => {
  const actions: EditorAction[] = [
    {
      text: 'Bold',
      onClick: () => editor.chain().focus().toggleBold().run(),
    },
    {
      text: 'Italic',
      onClick: () => editor.chain().focus().toggleItalic().run(),
    },
    {
      text: 'Underline',
      onClick: () => editor.chain().focus().toggleUnderline().run(),
    },
    {
      text: 'Strike',
      onClick: () => editor.chain().focus().toggleStrike().run(),
    },
    {
      text: 'List',
      onClick: () => editor.chain().focus().toggleBulletList().run(),
    },
    {
      text: 'Link',
      onClick: () =>
        editor
          .chain()
          .focus()
          .toggleLink({ href: prompt('Введите ссылку') ?? '' })
          .run(),
    },
    {
      text: 'Left',
      onClick: () => editor.chain().focus().setTextAlign('left').run(),
    },
    {
      text: 'Center',
      onClick: () => editor.chain().focus().setTextAlign('center').run(),
    },
    {
      text: 'Right',
      onClick: () => editor.chain().focus().setTextAlign('right').run(),
    },
    {
      text: 'Justify',
      onClick: () => editor.chain().focus().setTextAlign('justify').run(),
    },
  ]

  return (
    <div style={{ display: 'inline' }}>
      <input
        type="number"
        min={1}
        max={6}
        onChange={e =>
          editor.commands.toggleHeading({
            level: +e.target.value as 1 | 2 | 3 | 4 | 5 | 6,
          })
        }
      />
      {actions.map((action, index) => (
        <button key={index} onClick={action.onClick}>
          {action.text}
        </button>
      ))}
    </div>
  )
}
