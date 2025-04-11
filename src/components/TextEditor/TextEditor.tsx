import { useEditor, EditorContent } from '@tiptap/react'
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
const content = '<p>Hello World!</p>'

export const TextEditor = () => {
  const editor = useEditor({
    extensions,
    content,
  })

  return (
    editor && (
      <div>
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>
    )
  )
}
