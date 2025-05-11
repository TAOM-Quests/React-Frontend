import { beforeEach, describe, expect, test } from 'vitest'
import { Dropdown } from '../Dropdown'
import { itemsString } from './dropdownFixture'
import { userEvent } from '@vitest/browser/context'
import { renderWithProviders } from '../../../../mocks/redux/utils'

describe('Dropdown', () => {
  describe('When dropdown is not multiple', () => {
    let input: HTMLInputElement

    beforeEach(() => {
      renderWithProviders(
        <Dropdown id="test" items={itemsString} onChange={() => {}} />,
      )

      input = document.querySelector('input')!
    })

    test('On click item, input value should be changed', async () => {
      await userEvent.click(input)
      const items: NodeListOf<Element> =
        document.querySelectorAll('.option_item')

      await userEvent.click(items[0])

      expect(input.value).toEqual('Item 1')

      // expect(items[0].className).toContain('avatar')
    })
  })
})
