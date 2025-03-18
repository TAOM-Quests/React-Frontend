import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, test } from "vitest";
import { renderWithProviders } from "../../../../mocks/redux/utils";
import PersonInfo from "../PersonInfo";
import { admin, employee, user } from "./PersonInfoFixture";
import { userEvent } from "@vitest/browser/context";
import { setupWorker } from "msw/browser";
import { usersHandlers } from "../../../../mocks/api/userModule/users";

const server = setupWorker(...usersHandlers)

describe.only('PersonInfo', () => {
  let roleParagraph: Element
  let changeInputsButton: Element
  let profileFields: NodeListOf<Element>

  beforeAll(() => server.start({ onUnhandledRequest: 'error' }))
  afterAll(() => server.stop())
  afterEach(() => server.resetHandlers())

  describe('PersonInfo when user is not employee', () => {
    beforeEach(() => {
      renderWithProviders(<PersonInfo />, {
        preloadedState: {
          auth: {
            value: user
          }
        }
      })
      changeInputsButton = document.querySelector('button .change-inputs')!
      profileFields = document.querySelectorAll('input .profile-field')!
    })

    test('When changeInputsButton is clicked, profileFields shoulds be changable', () => {
      userEvent.click(changeInputsButton)

      profileFields.forEach((field) => {
        expect(field.getAttribute('disabled')).toBe(null)
      })
    })
  })

  describe('PersonInfo when user is admin', () => {
    beforeEach(() => {
      renderWithProviders(<PersonInfo />, {
        preloadedState: {
          auth: {
            value: admin
          }
        }
      })
      roleParagraph = document.querySelector('p .role')!
      changeInputsButton = document.querySelector('button .change-inputs')!
      profileFields = document.querySelectorAll('input .profile-field')!
    })

    test('Should show role', () => {
      expect(roleParagraph.textContent).toBe('Администратор')
    })
  })

  describe('PersonInfo when user is employee', () => {
    beforeEach(() => {
      renderWithProviders(<PersonInfo />, {
        preloadedState: {
          auth: {
            value: employee
          }
        }
      })
      roleParagraph = document.querySelector('p .role')!
      changeInputsButton = document.querySelector('button .change-inputs')!
      profileFields = document.querySelectorAll('input .profile-field')!
    })

    test('Should show role', () => {
      expect(roleParagraph.textContent).not.toBeNull()
    })
  })
})