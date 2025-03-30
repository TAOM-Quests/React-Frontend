import { beforeEach, describe, expect, test } from "vitest";
import { renderWithProviders } from "../../../../../mocks/redux/utils";
import PersonInfo from "../PersonInfo";
import { user, userProfile } from "./personInfoFixture";
import { userEvent } from "@vitest/browser/context";

describe('PersonInfo', () => {
  let changeInputsButton: Element
  let profileFields: NodeListOf<Element>

  beforeEach(() => {
    renderWithProviders(<PersonInfo {...userProfile}/>, {
      preloadedState: {
        auth: {
          value: user
        }
      }
    })
    changeInputsButton = document.querySelector('.change-inputs')!
    profileFields = document.querySelectorAll('.person-field')!
  })

  test('On start profileFields should be disabled', () => {
    profileFields.forEach((field) => {
      expect(field.getAttribute('disabled')).toBe("")
    })
  })

  test('When changeInputsButton is clicked, profileFields shoulds be changable', async () => {      
    await userEvent.click(changeInputsButton)

    profileFields.forEach((field) => {
      expect(field.getAttribute('disabled')).toBe(null)
    })
  })
})