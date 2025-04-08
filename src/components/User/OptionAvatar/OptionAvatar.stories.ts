import type { Meta, StoryObj } from '@storybook/react'
import { OptionAvatar } from './OptionAvatar'

const meta: Meta<typeof OptionAvatar> = {
  title: 'Components/OptionAvatar',
  component: OptionAvatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Компонент отображения информации о пользователе с аватаром, именем и должностью',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    avatarSrc: {
      control: 'text',
      description: 'URL изображения аватара',
    },
    text: {
      control: 'text',
      description: 'Имя пользователя',
    },
    description: {
      control: 'text',
      description: 'Должность пользователя',
    },
    size: {
      control: 'inline-radio',
      options: ['small', 'extraSmall'],
      description: 'Размер аватара',
    },
  },
}

export default meta

type Story = StoryObj<typeof OptionAvatar>

export const DefaultOptionAvatar: Story = {
  args: {
    text: 'Иванов Иван',
    description: 'Заведующий кафедры ПИ',
    size: 'small',
  },
}

export const ExtraSmallOptionAvatar: Story = {
  args: {
    text: 'Петров Петр',
    description: 'Программист',
    size: 'extraSmall',
  },
}

export const SmallOptionAvatar: Story = {
  args: {
    text: 'Петров Петр',
    description: 'Программист',
    size: 'small',
  },
}

export const WithoutDescriptionOptionAvatar: Story = {
  args: {
    text: 'Сидоров Сидор',
  },
}
