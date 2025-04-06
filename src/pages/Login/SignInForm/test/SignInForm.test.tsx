import { beforeEach, describe, expect, test, vi } from 'vitest'
import SignInForm from '../SignInForm'
import { userEvent } from '@vitest/browser/context'
import '@vitest/browser/matchers'
import { renderWithProviders } from '../../../../mocks/redux/utils'

const mockedUseNavigate = vi.fn()
vi.mock('react-router', async () => {
  const mod =
    await vi.importActual<typeof import('react-router')>('react-router')
  return {
    ...mod,
    useNavigate: () => mockedUseNavigate,
  }
})

describe('SignInForm', () => {
  let passwordInput: Element
  let repeatPasswordInput: Element
  let signInButton: Element
  let errorMessage: Element | null

  describe('Repeat password logic', () => {
    beforeEach(() => {
      renderWithProviders(<SignInForm />)
      passwordInput = document.querySelector('.password-input')!
      repeatPasswordInput = document.querySelector('.repeat-password-input')!
      signInButton = document.querySelector('button')!
    })

    test('Success on same passwords', async () => {
      const password = 'password'

      await userEvent.type(passwordInput, password)
      await userEvent.type(repeatPasswordInput, password)
      await userEvent.click(signInButton)
      errorMessage = document.querySelector('p')

      expect(errorMessage).toBeNull()
    })

    test('Error on different passwords', async () => {
      const password = 'password'
      const differentPassword = 'differentPassword'

      await userEvent.type(passwordInput, password)
      await userEvent.type(repeatPasswordInput, differentPassword)
      await userEvent.click(signInButton)
      errorMessage = document.querySelector('p')

      expect(errorMessage?.textContent).toEqual('Пароли не совпадают')
    })
  })
})
