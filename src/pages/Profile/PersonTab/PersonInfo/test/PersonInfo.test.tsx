import { beforeEach, describe, expect, test, vi } from "vitest";
import { renderWithProviders } from "../../../../../mocks/redux/utils";
import PersonInfo from "../PersonInfo";
import { typePersonFields, updatedProfile, user, userProfile } from "./personInfoFixture";
import { userEvent } from "@vitest/browser/context";
import { users } from "../../../../../services/api/userModule/users/users";
import { UserProfile } from "../../../../../models/userProfile";

const FIELDS_ORDER: (keyof typeof typePersonFields)[] = [
  'lastName',
  'firstName',
  'patronymic',
  'sex',
  // 'birthDate',
  'phone',
  'email'
]

describe('PersonInfo', () => {
  let changeInputsButton: Element
  let profileFields: NodeListOf<HTMLInputElement>

  beforeEach(() => {
    const store = {
      preloadedState: {
        auth: {
          value: user
        }
      }
    }
    const setElements = () => {
      changeInputsButton = document.querySelector('.change-inputs')!
      profileFields = document.querySelectorAll('.person-field')!
    }

    const { unmount } = renderWithProviders(
      <PersonInfo
        profile={userProfile}
        updateProfile={(updatedProfile: UserProfile) => {
          console.log('RERENDER', updatedProfile)
          renderWithProviders(<PersonInfo profile={updatedProfile} updateProfile={() => {}}/>, store)
          unmount()
          setElements()
        }}
      />,
      store
    )

    setElements()
  })

  test('On start profileFields should be disabled', () => {
    profileFields.forEach(field => {
      expect(field.getAttribute('disabled')).toBe("")
    })
  })

  test('When changeInputsButton is clicked, profileFields shoulds be changable', async () => {
    await userEvent.click(changeInputsButton)

    profileFields.forEach(field => {
      expect(field.getAttribute('disabled')).toBe(null)
    })
  })

  test('On saving person data, should be request to update profile', async () => {
    const spyUpdateProfile = vi.spyOn(users, 'updateProfile')

    await userEvent.click(changeInputsButton)
    FIELDS_ORDER.forEach(async (field, index) => {
      await userEvent.type(profileFields[index], typePersonFields[field] as string)
    })
    await userEvent.click(changeInputsButton)

    expect(spyUpdateProfile).toBeCalledTimes(1)
  })

  test('On saving person data, personFields values should be changed', async () => {
    vi.spyOn(users, 'updateProfile')
      .mockImplementationOnce(async () => updatedProfile)

    await userEvent.click(changeInputsButton)
    FIELDS_ORDER.forEach(async (field, index) => {
      const typeValue = typePersonFields[field]

      await userEvent.type(profileFields[index], typeValue as string)
    })
    await userEvent.click(changeInputsButton)
    
    profileFields.forEach((field, index) => {
      expect(field.value).toBe(typePersonFields[FIELDS_ORDER[index]])
    })
  })
})