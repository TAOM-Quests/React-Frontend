export interface InputProps {
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  label?: string
  className?: string
} 

export default function Input({
  value,
  onChange,
  type,
  label,
  className,
}: InputProps) {
  const inputClassName = `tq-input ${className}`

  return (
    <div>
      <label>{label}</label>
      <input 
        className={inputClassName}
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}