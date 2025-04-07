import type { Meta, StoryObj } from '@storybook/react'
import { ICON_MAP } from '../../../assets/icons'
import { Avatar } from './Avatar'
import './Avatar.scss'

const meta: Meta<typeof Avatar> = {
  title: 'Ui-Kit/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Компонент аватара',
      },
    },
  },
  argTypes: {
    src: {
      control: 'text',
      description: 'URL изображения',
    },
    alt: {
      control: 'text',
      description: 'Альтернативный текст',
    },
    size: {
      control: 'inline-radio',
      description: 'Размер аватара',
    },
    isRound: {
      control: 'boolean',
      description: 'Круглый аватар',
    },
    icon: {
      control: 'select',
      options: Object.keys(ICON_MAP),
      description: 'Иконка для отображения',
    },
    onClick: {
      description: 'Обработчик клика',
    },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Avatar>

export const ImageAvatar: Story = {
  args: {
    src: 'https://i.pinimg.com/originals/c9/a6/35/c9a635d3edd9ae297b97d3013e896cca.jpg  ',
    alt: 'Xomik Image',
  },
}

export const IconAvatar: Story = {
  args: {
    src: 'https://steamuserimages-a.akamaihd.net/ugc/974353381258701515/67DFC214C7166FAECF380BFACC10976AA2D86D1D/?imw=512&amp;imh=512&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true',
    alt: 'Meme Image',
    icon: 'SEARCH',
    size: 'extraLarge',
  },
}

export const ExtraSmall: Story = {
  args: {
    alt: 'Small Avatar Image',
    size: 'extraSmall',
  },
}

export const Small: Story = {
  args: {
    alt: 'Small Avatar Image',
    size: 'small',
  },
}

export const Large: Story = {
  args: {
    alt: 'Medium Avatar Image',
    size: 'large',
  },
}

export const ExtraLarge: Story = {
  args: {
    alt: 'Large Avatar Image',
    size: 'extraLarge',
  },
}

export const Round: Story = {
  args: {
    alt: 'Round Avatar Image',
    isRound: true,
  },
}

export const Square: Story = {
  args: {
    alt: 'Square Avatar Image',
    isRound: false,
  },
}

export const Clickable: Story = {
  args: {
    alt: 'Clickable Avatar Image',
    onClick: () => alert('Avatar Clicked!'),
  },
}
