import { UserAuth } from "../../../../models/userAuth";

export const admin: UserAuth = {
  id: 1,
  email: "roman.nichi.o@gmail.com",
  token: "testToken",
  roleId: 2,
  departmentId: 1,
  isAdmin: true
}

export const user: UserAuth = {
  id: 2,
  email: "marika.meydra@gmail.com",
  token: "testToken",
  roleId: 1
}

export const employee: UserAuth = {
  id: 3,
  email: "marika.nichi@gmail.com",
  token: "testToken",
  roleId: 3
}