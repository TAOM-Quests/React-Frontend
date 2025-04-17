import { Option } from '../Option/Option'
import './Switcher.scss'

interface SwitcherProps {
  options: string[]
  onChange: (option: string) => void
  activeOption: string
}

export const Switcher = ({
  options,
  onChange,
  activeOption,
}: SwitcherProps) => {
  return (
    <div className="switcher">
      {options.map(option => (
        <Option
          key={option}
          text={option}
          onSelect={() => onChange(option)}
          className={`switcher__option ${activeOption === option ? 'switcher__option--active' : ''}`}
        />
      ))}
    </div>
  )
}
