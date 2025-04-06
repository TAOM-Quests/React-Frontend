import type { Meta, StoryObj } from '@storybook/react';
import { ICON_MAP } from '../../../assets/icons/constants';
import { Icon } from "./Icon";
import "./Icon.scss"

const meta: Meta<typeof Icon> = {
  title: 'Ui-Kit/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    icon: {
      control: 'select',
      options: Object.keys(ICON_MAP),
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    icon: "CHECK",
    size: 'small',
    colorIcon: 'secondary',
  },
};

export const ExtraLarge: Story = {
  args: {
    icon: 'CHECK',
    size: 'extra_large',
  },
};

export const Large: Story = {
  args: {
    icon: 'CHECK',
    size: 'large',
  },
};

export const Small: Story = {
  args: {
    icon: 'CHECK',
    size: 'small',
  },
};

export const ExtraSmall: Story = {
  args: {
    icon: 'CHECK',
    size: 'extra_small',
  },
};

export const CustomColor: Story = {
  args: {
    icon: 'CHECK',
    size: 'extra_large',
    color: 'blue',
  },
};