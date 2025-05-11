import { beforeEach, describe, expect, test, vi } from 'vitest'
import { renderWithProviders } from '../../../mocks/redux/utils'
import { EventCreate } from '../EventCreate'
import { userEvent } from '@vitest/browser/context'
import { events } from '../../../services/api/eventModule/events/events'

const mockNavigate = vi.fn()
vi.mock('react-router', async () => {
  const mod =
    await vi.importActual<typeof import('react-router')>('react-router')
  return {
    ...mod,
    useNavigate: () => mockNavigate,
  }
})

describe('EventCreate', () => {
  let descriptionInput: Element
  let addScheduleItemButton: Element
  let addFileInput: Element
  let addAdditionalInfoButtons: NodeListOf<Element>
  let saveButton: Element

  beforeEach(() => {
    renderWithProviders(<EventCreate />)

    descriptionInput = document.querySelector('input .description')!
    addFileInput = document.querySelector('input .file')!
    addScheduleItemButton = document.querySelector('button .add-schedule-item')!
    addAdditionalInfoButtons = document.querySelectorAll(
      'button .additional-info',
    )
    saveButton = document.querySelector('button .save')!
  })

  test('Should navigate to home page, when user is not Employee', () => {
    expect(mockNavigate).toBeCalledTimes(1)
  })

  test('On add schedule item, should creating three inputs', async () => {
    await userEvent.click(addScheduleItemButton)

    expect(document.querySelectorAll('input .schedule-item').length).toBe(3)
  })

  test('On upload file, should crating file component', async () => {
    await userEvent.upload(
      addFileInput,
      new File([''], 'test.png', { type: 'image/png' }),
    )

    expect(document.querySelectorAll('div .file').length).toBe(1)
  })

  test('On click save button, should be request to create event', async () => {
    const spyCreateEvent = vi.spyOn(events, 'create')

    await userEvent.click(saveButton)

    expect(spyCreateEvent).toBeCalledTimes(1)
  })

  test('On creating event, description should save as html', async () => {
    const spyCreateEvent = vi.spyOn(events, 'create')

    await userEvent.type(descriptionInput, 'test')
    await userEvent.click(saveButton)

    expect(spyCreateEvent).toBeCalledWith({ description: '<div>test</div>' })
  })

  test('On creating event, selected additional info should be add to description', async () => {
    for (let button of addAdditionalInfoButtons) {
      await userEvent.click(button)
    }

    await userEvent.click(saveButton)

    for (let button of addAdditionalInfoButtons) {
      expect(descriptionInput.textContent).toContain(button.textContent)
    }
  })
})
