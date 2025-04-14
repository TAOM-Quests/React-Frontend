export interface TabButtonProps
extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  isActive: boolean
}

export default function TabButton(props: TabButtonProps) {
  let className = props.className ?? ''

  if (props.isActive) {
    className += ' active'
  }

  return (
    <button {...{...props, className}}>
      {props.text}
    </button>
  )
}