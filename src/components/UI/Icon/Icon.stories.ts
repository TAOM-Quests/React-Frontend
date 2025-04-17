import type { Meta, StoryObj } from '@storybook/react'
import { ICON_MAP } from '../../../assets/icons'
import { Icon } from './Icon'
import './Icon.scss'

const meta: Meta<typeof Icon> = {
  title: 'Ui-Kit/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Компонент иконки',
      },
    },
  },
  argTypes: {
    icon: {
      control: 'select',
      options: Object.keys(ICON_MAP),
      description: 'Выбор иконки',
    },
    size: {
      control: 'text',
      description: `
**Размер иконки**  
Стандартные варианты:  
- **36px**
- **30px**
- **20px**
- **16px** 

Или используйте **кастомный размер**
`,
    },
    colorIcon: {
      control: 'text',
      description: `
**Цвет иконки**  
Стандартные варианты:  
- **primary**  
- **secondary**  
- **accent**  
- **subdued**  
- **soft-blue**  
- **neutral**  

Или используйте **кастомный цвет**, например, введите значение в формате **#RRGGBB**.
`,
    },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Icon>

export const Default: Story = {
  args: {
    icon: 'CHECK',
    size: '20px',
    colorIcon: 'secondary',
  },
}

export const ExtraLarge: Story = {
  args: {
    icon: 'CHECK',
    size: '36px',
  },
}

export const Large: Story = {
  args: {
    icon: 'CHECK',
    size: '30px',
  },
}

export const Small: Story = {
  args: {
    icon: 'CHECK',
    size: '20px',
  },
}

export const ExtraSmall: Story = {
  args: {
    icon: 'CHECK',
    size: '16px',
  },
}

export const CustomColor: Story = {
  args: {
    icon: 'CHECK',
    size: '36px',
    colorIcon: 'blue',
  },
}

export const CustomSize: Story = {
  args: {
    icon: 'CHECK',
    size: '5rem',
  },
}
