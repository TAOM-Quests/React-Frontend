import React, { forwardRef} from 'react'
import InputMask from 'react-input-mask'
import Input, { InputProps } from '../UI/Input/Input'

interface MaskedInputProps extends Omit<InputProps, 'onChange' | 'value'> {
  mask: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
}

const ForwardedInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => (
  <Input {...props} ref={ref} />
));

export const MaskedInput = ({
  mask,
  value,
  disabled,
  onChange,
  ...props
}: MaskedInputProps) => {
  return (
    <InputMask mask={mask} disabled={disabled} value={value} onChange={onChange}>
      {(inputProps: any) => (
        <ForwardedInput
          disabled={disabled}
          {...inputProps}
          {...props}
        />
      )}
    </InputMask>
  );
};