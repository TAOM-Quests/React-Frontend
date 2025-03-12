export interface ErrorMessageProps {
  text: string
}

export default function ErrorMessage({
  text
}: ErrorMessageProps) {
  return (
    <div>
      <p>{text}</p>
    </div>
  )
}