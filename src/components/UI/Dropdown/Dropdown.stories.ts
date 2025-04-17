import { Dropdown } from './Dropdown'
import type { Meta, StoryObj } from '@storybook/react'
import image from '../../../assets/images/mem.png'

const meta: Meta<typeof Dropdown> = {
  title: 'Ui-Kit/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Компонент выпадающего списка с поиском элементов',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Dropdown>

const items = [
  {
    id: 1,
    text: 'Option 1',
  },
  {
    id: 2,
    text: 'Option 2',
  },
  {
    id: 3,
    text: 'Option 3',
    avatar: {
      src: image,
      description: 'Avatar',
    },
  },
]

export const SingleSelect: Story = {
  args: {
    id: 'single-select',
    items,
    multiple: false,
    onChange: selected => console.log('Selected:', selected),
  },
}

export const MultiSelect: Story = {
  args: {
    id: 'multi-select',
    items,
    multiple: true,
    onChange: selected => console.log('Selected:', selected),
  },
}

export const WithIcons: Story = {
  args: {
    id: 'with-icons',
    items: [
      {
        id: 1,
        text: 'Option 1',
        iconBefore: 'CHECK',
      },
      {
        id: 2,
        text: 'Option 2',
        iconAfter: 'CHECK',
      },
    ],
    multiple: false,
    onChange: selected => console.log('Selected:', selected),
  },
}
export const WithAvatars: Story = {
  args: {
    id: 'with-avatars',
    items: [
      {
        id: 1,
        text: 'Option 1',
        avatar: {
          src: image,
          description: 'Avatar 1',
        },
      },
      {
        id: 2,
        text: 'Option 2',
        avatar: {
          src: image,
          description: 'Avatar 2',
        },
      },
    ],
    multiple: false,
    onChange: selected => console.log('Selected:', selected),
  },
}
