import { useEditor, EditorContent, EditorEvents } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { MenuBar } from './MenuBar/MenuBar'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import './TextEditor.scss'

export interface TextEditorProps {
  value: string
  onChange: (props: EditorEvents['update']) => void
  placeholder?: string
  label?: string
}

export const TextEditor = ({
  value,
  onChange,
  placeholder,
  label,
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
    onUpdate: onChange,
  })
  return (
    editor && (
      <div className="editor">
        {label && <label className="label body_s_sb">{label}</label>}
        <div>
          <MenuBar editor={editor} />
          <EditorContent editor={editor} />
        </div>
      </div>
    )
  )
}
