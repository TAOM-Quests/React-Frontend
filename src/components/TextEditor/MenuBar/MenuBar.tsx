import { Editor } from '@tiptap/react'
import './MenuBar.scss'
import { Icon } from '../../UI/Icon/Icon'
import { ICON_MAP } from '../../../assets/icons'
export interface MenuBarProps {
  editor: Editor
}

interface EditorAction {
  icon: keyof typeof ICON_MAP
  onClick: () => void
}

export const MenuBar = ({ editor }: MenuBarProps) => {
  const actions: EditorAction[] = [
    {
      icon: 'BOLD',
      onClick: () => editor.chain().focus().toggleBold().run(),
    },
    {
      icon: 'ITALIC',
      onClick: () => editor.chain().focus().toggleItalic().run(),
    },
    {
      icon: 'UNDERLINE',
      onClick: () => editor.chain().focus().toggleUnderline().run(),
    },
    {
      icon: 'STRIKE',
      onClick: () => editor.chain().focus().toggleStrike().run(),
    },
    {
      icon: 'LIST',
      onClick: () => editor.chain().focus().toggleBulletList().run(),
    },
    {
      icon: 'LINK',
      onClick: () =>
        editor
          .chain()
          .focus()
          .toggleLink({ href: prompt('Введите ссылку') ?? '' })
          .run(),
    },
    {
      icon: 'LEFT',
      onClick: () => editor.chain().focus().setTextAlign('left').run(),
    },
    {
      icon: 'CENTER',
      onClick: () => editor.chain().focus().setTextAlign('center').run(),
    },
    {
      icon: 'RIGHT',
      onClick: () => editor.chain().focus().setTextAlign('right').run(),
    },
    {
      icon: 'JUSTIFY',
      onClick: () => editor.chain().focus().setTextAlign('justify').run(),
    },
  ]

  const headings: EditorAction[] = [
    {
      icon: 'HEADING_1',
      onClick: () =>
        editor
          .chain()
          .focus()
          .toggleHeading({
            level: 1,
          })
          .run(),
    },
    {
      icon: 'HEADING_2',
      onClick: () =>
        editor
          .chain()
          .focus()
          .toggleHeading({
            level: 2,
          })
          .run(),
    },
    {
      icon: 'HEADING_3',
      onClick: () =>
        editor
          .chain()
          .focus()
          .toggleHeading({
            level: 3,
          })
          .run(),
    },
    {
      icon: 'HEADING_4',
      onClick: () =>
        editor
          .chain()
          .focus()
          .toggleHeading({
            level: 4,
          })
          .run(),
    },
    {
      icon: 'HEADING_5',
      onClick: () =>
        editor
          .chain()
          .focus()
          .toggleHeading({
            level: 5,
          })
          .run(),
    },
    {
      icon: 'HEADING_6',
      onClick: () =>
        editor
          .chain()
          .focus()
          .toggleHeading({
            level: 6,
          })
          .run(),
    },
  ]

  return (
    <div className="editor--header">
      {headings.map((action, index) => (
        <Icon
          key={index}
          onClick={action.onClick}
          icon={action.icon}
          colorIcon="neutral"
        />
      ))}
      {actions.map((action, index) => (
        <Icon
          key={index}
          onClick={action.onClick}
          icon={action.icon}
          colorIcon="neutral"
          size="extraSmall"
        />
      ))}
    </div>
  )
}
