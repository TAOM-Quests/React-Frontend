import { useEditor, EditorContent, EditorEvents } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { MenuBar } from './MenuBar/MenuBar'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import './TextEditor.scss'
import { useEffect } from 'react'

export interface TextEditorProps {
  value: string
  onChange: (props: EditorEvents['update']) => void
  placeholder?: string
  label?: string
  disabled?: boolean
}

export const TextEditor = ({
  value,
  onChange,
  placeholder,
  label,
  disabled,
}: TextEditorProps) => {
  const extensions = [
    StarterKit,
    Placeholder.configure({
      placeholder: placeholder || 'Начните писать здесь...',
    }),
    Underline,
    Link,
    TextAlign.configure({ types: ['heading', 'paragraph'] }),
  ]
  const editor = useEditor({
    extensions,
    content: value,
    editable: !disabled,
    onUpdate: onChange,
  })

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value)
    }
  }, [value, editor])

  return (
    editor && (
      <div className={`editor ${disabled ? 'editor--disabled' : ''}`}>
        {label && <label className="label body_s_sb">{label}</label>}
        <div>
          {!disabled && <MenuBar editor={editor} />}
          <EditorContent editor={editor} />
        </div>
      </div>
    )
  )
}
