import { UserAuth } from "../../../../../models/userAuth"
import { UserProfile, UserProfileEmployee } from "../../../../../models/userProfile"

export const employee: UserAuth = {
  id: 3,
  email: "marika.nichi@gmail.com",
  token: "testToken",
  roleId: 3
}

export const employeeProfile: UserProfileEmployee = {
  id: 1,
  email: "marika.nichi@gmail.com",
  firstName: "Maran",
  lastName: "Nichidra",
  patronymic: "Oldedovna",
  birthDate: new Date('08-012-2003'),
  sex: "Male",
  phone: "897-777-77-77",
  completedQuests: [],
  position: "Преподватель",
  department: "ПИ"
}