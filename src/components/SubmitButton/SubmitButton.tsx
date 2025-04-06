export interface SubmitButtonProps {
  text: string
  action?: () => void
}

export default function SubmitButton({ text, action }: SubmitButtonProps) {
  return (
    <div>
      <button type="submit" onClick={action}>
        {text}
      </button>
    </div>
  )
}
