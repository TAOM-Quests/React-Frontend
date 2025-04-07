import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Input from './Input'
import { ICON_MAP } from '../../../assets/icons'

const meta: Meta<typeof Input> = {
  title: 'Ui-Kit/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Компонент поля ввода',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Текст метки',
    },
    helperText: {
      control: 'text',
      description: 'Вспомогательный текст',
    },
    errorText: {
      control: 'text',
      description: 'Текст ошибки',
    },
    iconBefore: {
      control: 'select',
      options: Object.keys(ICON_MAP),
      description: 'Иконка перед введенным текстом',
    },
    iconAfter: {
      control: 'select',
      options: Object.keys(ICON_MAP),
      description: 'Иконка после введенного текста',
    },
    invalid: {
      control: 'boolean',
      description: 'Состояние ошибки',
    },
    value: {
      control: 'text',
      description: 'Значение поля',
    },
    onChange: {
      action: 'onChange',
      description: 'Обработчик изменения',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password'],
      description: 'Тип поля',
    },
    disabled: {
      control: 'boolean',
      description: 'Состояние отключения',
    },
    placeholder: {
      control: 'text',
      description: 'Текст заполнения',
    },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Input>

export const Normal: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    helperText: 'Вспомогательный текст',
    errorText: '',
    invalid: false,
    value: '',
    type: 'text',
    disabled: false,
  },
}

export const WithError: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    helperText: 'Вспомогательный текст',
    errorText: 'Текст ошибки',
    invalid: true,
    value: '',
    type: 'text',
    disabled: false,
  },
}

export const WithIcon: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    helperText: 'Вспомогательный текст',
    errorText: '',
    invalid: false,
    value: '',
    type: 'text',
    disabled: false,
    iconBefore: 'SEARCH',
    iconAfter: 'ANGLE_DOWN',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    helperText: 'Вспомогательный текст',
    errorText: '',
    invalid: false,
    value: '',
    type: 'text',
    disabled: true,
  },
}
