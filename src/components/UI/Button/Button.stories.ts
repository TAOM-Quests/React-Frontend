import type { Meta, StoryObj } from '@storybook/react'
import { ICON_MAP } from '../../../assets/icons'
import { Button } from './Button'
import './Button.scss'

const meta: Meta<typeof Button> = {
  title: 'Ui-Kit/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Основной компонент пользовательского интерфейса для взаимодействия с пользователем ',
      },
    },
  },
  argTypes: {
    text: {
      control: 'text',
      description: 'Текст кнопки',
    },
    typeButton: {
      control: 'inline-radio',
      description: 'Тип кнопки',
    },
    backgroundColor: {
      control: 'color',
      description: 'Цвет фона кнопки',
    },
    size: {
      control: 'inline-radio',
      description: 'Размер кнопки',
    },
    isIconOnly: {
      control: 'boolean',
      description: 'Только иконка',
    },
    isButtonCircle: {
      control: 'boolean',
      description: 'Круглая кнопка',
    },
    disabled: {
      control: 'boolean',
      description: 'Отключение кнопки',
    },
    iconBefore: {
      control: 'select',
      options: Object.keys(ICON_MAP),
      description: 'Иконка перед текстом',
    },
    iconAfter: {
      control: 'select',
      options: Object.keys(ICON_MAP),
      description: 'Иконка после текста',
    },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Button>

/** История для кнопки по умолчанию. */
export const Primary: Story = {
  args: {
    text: 'Primary Button',
    typeButton: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    text: 'Secondary Button',
    typeButton: 'secondary',
  },
}

export const Accent: Story = {
  args: {
    text: 'Accent Button',
    typeButton: 'accent',
  },
}

export const Subdued: Story = {
  args: {
    text: 'Subdued Button',
    typeButton: 'subdued',
  },
}

export const Disabled: Story = {
  args: {
    text: 'Disabled Button',
    disabled: true,
  },
}

export const Large: Story = {
  args: {
    text: 'Large Button',
    typeButton: 'primary',
    size: 'large',
  },
}

export const Small: Story = {
  args: {
    text: 'Small Button',
    typeButton: 'primary',
    size: 'small',
  },
}

export const Circle: Story = {
  args: {
    iconBefore: 'ADD_IMAGE',
    isButtonCircle: true,
  },
}

export const IconOnly: Story = {
  args: {
    iconBefore: 'ADD_IMAGE',
    isIconOnly: true,
  },
}

export const WithIconBefore: Story = {
  args: {
    text: 'Button with icon before',
    iconBefore: 'ADD_IMAGE',
  },
}

export const WithIconAfter: Story = {
  args: {
    text: 'Button with icon after',
    iconAfter: 'ADD_IMAGE',
  },
}

export const IconBeforeAndAfter: Story = {
  args: {
    text: 'Button icon before and after',
    iconAfter: 'ADD_IMAGE',
    iconBefore: 'ADD_IMAGE',
  },
}
