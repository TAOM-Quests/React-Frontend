import { UserAuth } from "../../../../../models/userAuth";
import { UserProfile } from "../../../../../models/userProfile";

export const user: UserAuth = {
  id: 2,
  email: "marika.meydra@gmail.com",
  token: "testToken",
  roleId: 1
}

export const userProfile: UserProfile = {
  id: 1,
  email: "marika.meydra@gmail.com",
  firstName: "Marika",
  lastName: "Meidra",
  patronymic: "Robertovna",
  birthDate: new Date('07-08-2003'),
  sex: "Female",
  phone: "898-888-88-88",
  completedQuests: []
}