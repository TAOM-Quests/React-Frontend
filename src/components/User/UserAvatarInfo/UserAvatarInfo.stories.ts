import type { Meta, StoryObj } from '@storybook/react'
import { UserAvatarInfo } from './UserAvatarInfo'

const meta: Meta<typeof UserAvatarInfo> = {
  title: 'Components/UserAvatarInfo',
  component: UserAvatarInfo,
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

type Story = StoryObj<typeof UserAvatarInfo>

export const DefaultUserAvatarInfo: Story = {
  args: {
    text: 'Иванов Иван',
    description: 'Заведующий кафедры ПИ',
    size: 'small',
  },
}

export const ExtraSmallUserAvatarInfo: Story = {
  args: {
    text: 'Петров Петр',
    description: 'Программист',
    size: 'extraSmall',
  },
}

export const SmallUserAvatarInfo: Story = {
  args: {
    text: 'Петров Петр',
    description: 'Программист',
    size: 'small',
  },
}

export const WithoutDescriptionUserAvatarInfo: Story = {
  args: {
    text: 'Сидоров Сидор',
  },
}
