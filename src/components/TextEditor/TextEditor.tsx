import { useEditor, EditorContent, EditorEvents } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { MenuBar } from './MenuBar/MenuBar'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'

const extensions = [
  StarterKit,
  Underline,
  Link,
  TextAlign.configure({ types: ['heading', 'paragraph'] }),
]

export interface TextEditorProps {
  value: string
  onChange: (props: EditorEvents['update']) => void
}

export const TextEditor = ({ value, onChange }: TextEditorProps) => {
  const editor = useEditor({
    extensions,
    content: value,
    onUpdate: onChange,
  })

  return (
    editor && (
      <div className="editor">
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>
    )
  )
}
