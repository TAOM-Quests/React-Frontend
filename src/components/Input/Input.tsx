export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  className?: string
}

export default function Input(props: InputProps) {
  let inputClassName = `tq-input`

  if (props.className) {
    inputClassName += ` ${props.className}`
  }

  return (
    <div>
      <label>{props.label}</label>
      <input
        className={inputClassName}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        {...props}
      />
    </div>
  )
}
