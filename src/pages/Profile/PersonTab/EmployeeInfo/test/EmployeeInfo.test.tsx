import { beforeEach, describe } from "vitest"
import { renderWithProviders } from "../../../../../mocks/redux/utils"
import EmployeeInfo from "../EmployeeInfo"
import { employee, employeeProfile } from "./employeeInfoFixture"

describe('EmployeeInfo', () => {  
  beforeEach(() => {
    renderWithProviders(<EmployeeInfo {...employeeProfile}/>, {
      preloadedState: {
        auth: {
          value: employee
        }
      }
    })
  })
})