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
      control: 'inline-radio',
      description: 'Размер иконки',
    },
    typeIcon: {
      control: 'inline-radio',
      description: 'Цвет иконки',
    },
    color: {
      control: 'color',
      description: 'Цвет иконки',
    },
    fontSize: {
      control: 'text',
      description: 'Размер иконки',
    },
    viewBox: {
      control: 'text',
      description: 'Размер иконки',
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
    typeIcon: 'secondary',
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
    color: 'blue',
  },
}
