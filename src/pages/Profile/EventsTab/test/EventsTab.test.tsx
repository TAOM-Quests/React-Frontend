import { beforeEach, describe, expect, MockInstance, test, vi } from 'vitest'
import { renderWithProviders } from '../../../../mocks/redux/utils'
import EventsTab from '../EventsTab'
import { employee, user } from './eventsTabEnvironment'
import { events } from '../../../../services/api/eventModule/events/events'
import { userEvent } from '@vitest/browser/context'

describe('EventsTab', () => {
  let usersApiMock: MockInstance
  let eventsNameInput: Element
  let eventsTypeInput: Element
  let eventsStatusInput: Element

  describe('When user is not employee', () => {
    beforeEach(() => {
      usersApiMock = vi.spyOn(events, 'getManyByParams')

      renderWithProviders(<EventsTab user={user} />)

      eventsNameInput = document.querySelector(
        'input[placeholder="Поиск по названию"]',
      )!
      eventsTypeInput = document.querySelector(
        'input[placeholder="Поиск по типу"]',
      )!
      eventsStatusInput = document.querySelector(
        'input[placeholder="Поиск по статусу"]',
      )!
    })

    test('On start should fetch events by participant', () => {
      expect(usersApiMock).toBeCalledWith({ participant: user.id })
    })

    test('When filter is changed by name, should fetch events', async () => {
      await userEvent.type(eventsNameInput, 'IT Open Doors')

      expect(usersApiMock).toBeCalledWith({
        participant: user.id,
        name: 'IT Open Doors',
      })
    })

    test('When filter is changed by type, should fetch events', async () => {
      await userEvent.type(eventsTypeInput, '1')

      expect(usersApiMock).toBeCalledWith({
        participant: user.id,
        type: 1,
      })
    })

    test('When filter is changed by name, should fetch events', async () => {
      await userEvent.type(eventsStatusInput, '1')

      expect(usersApiMock).toBeCalledWith({
        participant: user.id,
        status: 1,
      })
    })

    test('When filter is changed by all parameters, should fetch events', async () => {
      await userEvent.type(eventsNameInput, 'IT Open Doors')
      await userEvent.type(eventsTypeInput, '1')
      await userEvent.type(eventsStatusInput, '1')

      expect(usersApiMock).toBeCalledWith({
        participant: user.id,
        name: 'IT Open Doors',
        type: 1,
        status: 1,
      })
    })
  })

  describe('When user is employee', () => {
    beforeEach(() => {
      usersApiMock = vi.spyOn(events, 'getManyByParams')

      renderWithProviders(<EventsTab user={employee} />)
    })

    test('On start should fetch events by executor', () => {
      expect(usersApiMock).toBeCalledWith({ executor: employee.id })
    })
  })
})
