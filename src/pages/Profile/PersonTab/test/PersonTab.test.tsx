import { beforeEach, describe, expect, test } from 'vitest'
import { renderWithProviders } from '../../../../mocks/redux/utils'
import { employeeProfile, userProfile } from './personTabFixture'
import PersonTab from '../PersonTab'

describe('PersonTab', () => {
  describe('When user is not employee', () => {
    beforeEach(() => {
      renderWithProviders(
        <PersonTab profile={userProfile} updatePerson={() => {}} />,
      )
    })

    test('Should render only PersonInfo', () => {
      expect(document.querySelector('.person-info')).toBeDefined()
      expect(document.querySelector('.employee-info')).toBeNull()
    })
  })

  describe('When user is employee', () => {
    beforeEach(() => {
      renderWithProviders(
        <PersonTab profile={employeeProfile} updatePerson={() => {}} />,
      )
    })

    test('Should render PersonInfo and EmployeeInfo', () => {
      expect(document.querySelector('.person-info')).toBeDefined()
      expect(document.querySelector('.employee-info')).toBeDefined()
    })
  })
})
