import { beforeEach, describe, expect, test, vi } from 'vitest'
import { eventEmptyData, eventFullData } from './eventMinimizeEnvironment'
import EventMinimize from '../EventMinimize'
import { renderWithProviders } from '../../../mocks/redux/utils'
import { userEvent } from '@vitest/browser/context'

const mockNavigate = vi.fn()
vi.mock('react-router', async () => {
  const mod =
    await vi.importActual<typeof import('react-router')>('react-router')
  return {
    ...mod,
    useNavigate: () => mockNavigate,
  }
})

describe('EventMinimize', () => {
  let eventElement: Element
  let nameParagraph: Element
  let dateParagraph: Element
  let statusParagraph: Element
  let addressParagraph: Element
  let onlineMeetingParagraph: Element
  let typeParagraph: Element

  describe('When event is full', () => {
    beforeEach(() => {
      const { container } = renderWithProviders(
        <EventMinimize {...eventFullData} />,
      )
      eventElement = container

      const documentParagraphs = document.querySelectorAll('p')
      nameParagraph = documentParagraphs[0]
      dateParagraph = documentParagraphs[1]
      statusParagraph = documentParagraphs[2]
      addressParagraph = documentParagraphs[3]
      onlineMeetingParagraph = documentParagraphs[4]
      typeParagraph = documentParagraphs[5]
    })

    test('Should render name', () => {
      expect(nameParagraph.textContent).toBe(eventFullData.name)
    })

    // test('should render date', () => {
    //   expect(dateParagraph.textContent).toBe(eventFullData.date?.toDateString())
    // })

    test('Should render empty status, when is not employee', () => {
      expect(statusParagraph.textContent).toBe('')
    })

    test('Should render status, when is employee', () => {
      expect(statusParagraph.textContent).toBe('')
    })

    test('Should render address', () => {
      expect(addressParagraph.textContent).toBe(eventFullData.address)
    })

    test('Should render platform', () => {
      expect(onlineMeetingParagraph.textContent).toBe(eventFullData.platform)
    })

    test('Should render type', () => {
      expect(typeParagraph.textContent).toBe(eventFullData.type)
    })

    test('When click, should navigate to event page', async () => {
      await userEvent.click(eventElement)

      expect(mockNavigate).toBeCalledTimes(1)
    })
  })

  describe('When event is empty', () => {
    beforeEach(() => {
      renderWithProviders(<EventMinimize {...eventEmptyData} />)

      const documentParagraphs = document.querySelectorAll('p')
      nameParagraph = documentParagraphs[0]
      dateParagraph = documentParagraphs[1]
      statusParagraph = documentParagraphs[2]
      addressParagraph = documentParagraphs[3]
      onlineMeetingParagraph = documentParagraphs[4]
      typeParagraph = documentParagraphs[5]
    })

    test('Should render name', () => {
      expect(nameParagraph).toBeInTheDocument()
      expect(nameParagraph.textContent).toBe('')
    })

    test('Should render date', () => {
      expect(dateParagraph).toBeInTheDocument()
      expect(dateParagraph.textContent).toBe('')
    })

    test('Should render status', () => {
      expect(statusParagraph).toBeInTheDocument()
      expect(statusParagraph.textContent).toBe('')
    })

    test('Should render address', () => {
      expect(addressParagraph).toBeInTheDocument()
      expect(addressParagraph.textContent).toBe('')
    })

    test('Should render onlineMeeting', () => {
      expect(onlineMeetingParagraph).toBeInTheDocument()
      expect(onlineMeetingParagraph.textContent).toBe('')
    })

    test('Should render type', () => {
      expect(typeParagraph).toBeInTheDocument()
      expect(typeParagraph.textContent).toBe('')
    })
  })

  describe('When user is employee', () => {
    beforeEach(() => {
      renderWithProviders(<EventMinimize {...eventFullData} isEmployeeView />)

      const documentParagraphs = document.querySelectorAll('p')

      statusParagraph = documentParagraphs[2]
    })

    test('Should render status', () => {
      expect(statusParagraph.textContent).toBe(eventFullData.status)
    })
  })
})
