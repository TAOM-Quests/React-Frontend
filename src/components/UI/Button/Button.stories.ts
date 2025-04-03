import type { Meta, StoryObj } from '@storybook/react';
import { Button } from "./Button";
import "./Button.scss"
import { fn } from '@storybook/test';
import { IconType } from '../../../assets/icons/constants';

const meta: Meta<typeof Button> = {
  title: 'Ui-Kit/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    iconBefore: {
      control: 'select',
      options: Object.values(IconType), // Используйте значения из ICONS
    },
  },
  tags: ['autodocs'],
  args: { onClick: fn() },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    text: 'Primary Button',
    color: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    text: 'Secondary Button',
    color: 'secondary',
  },
};

export const Accent: Story = {
  args: {
    text: 'Accent Button',
    color: 'accent',
  },
};

export const Subdued: Story = {
  args: {
    text: 'Subdued Button',
    color: 'subdued',
  },
};

export const Disabled: Story = {
  args: {
    text: 'Disabled Button',
    disabled: true,
  },
};

export const Large: Story = {
  args: {
    text: 'Large Button',
    color: 'primary',
    size: 'large',
  },
};

export const Small: Story = {
  args: {
    text: 'Small Button',
    color: 'primary',
    size: 'small',
  },
};

export const Circle: Story = {
  args: {
    iconBefore: IconType.IMAGE,
    isButtonCircle: true,
  },
};

export const IconOnly: Story = {
  args: {
    iconBefore: IconType.IMAGE,
    isIconOnly: true,
  },
};

export const WithIconBefore: Story = {
  args: {
    text: 'Button with icon before',
    iconBefore: IconType.IMAGE,
  },
};

export const WithIconAfter: Story = {
  args: {
    text: 'Button with icon after',
    iconAfter: IconType.IMAGE,
  },
};

export const IconBeforeAndAfter: Story = {
  args: {
    text: 'Button icon before and after',
    iconAfter: IconType.IMAGE,
    iconBefore: IconType.IMAGE,
  },
};
