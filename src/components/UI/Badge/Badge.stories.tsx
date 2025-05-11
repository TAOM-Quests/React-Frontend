import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'
import './Badge.scss'

const meta: Meta<typeof Badge> = {
  title: 'Ui-Kit/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Компонент бейджа',
      },
    },
  },
  argTypes: {
    text: {
      control: 'text',
      description: 'Текст бейджа',
    },
    type: {
      control: 'inline-radio',
      options: [
        'primary',
        'accent',
        'info',
        'caution',
        'critical',
        'success',
        'neutral',
      ],
      description: 'Тип бейджа',
    },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Badge>

export const Primary: Story = {
  args: {
    text: 'Badge primary',
    type: 'primary',
  },
}

export const Accent: Story = {
  args: {
    text: 'Badge accent',
    type: 'accent',
  },
}

export const Info: Story = {
  args: {
    text: 'Badge info',
    type: 'info',
  },
}

export const Caution: Story = {
  args: {
    text: 'Badge caution',
    type: 'caution',
  },
}

export const Critical: Story = {
  args: {
    text: 'Badge critical',
    type: 'critical',
  },
}

export const Success: Story = {
  args: {
    text: 'Badge success',
    type: 'success',
  },
}

export const Neutral: Story = {
  args: {
    text: 'Badge neutral',
    type: 'neutral',
  },
}
