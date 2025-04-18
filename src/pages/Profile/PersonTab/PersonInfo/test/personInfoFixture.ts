import { UserAuth } from "../../../../../models/userAuth";
import { UserProfile, UserProfileUpdated } from "../../../../../models/userProfile";
import { ProfileUpdateDto } from "../../../../../services/api/userModule/users/usersDto";

export const user: UserAuth = {
  id: 2,
  email: 'marika.meidra@gmail.com',
  token: 'testToken'
}

export const userProfile: UserProfile = {
  id: 2,
  email: 'marika.meydra@gmail.com',
  firstName: 'Marika',
  lastName: 'Meidra',
  patronymic: 'Robertovna',
  birthDate: new Date('07-08-2003'),
  sex: 'Female',
  phone: '898-888-88-88',
  completedQuests: []
}

export const typePersonFields: ProfileUpdateDto = {
  id: 2,
  email: 'roman.nichi.o@gmail.com',
  firstName: 'Роман',
  lastName: 'Ничипуренко',
  patronymic: 'Олегович',
  birthDate: '28-06-2003',
  sex: 'Мужской',
  phone: '8-927-777-77-77'
}

export const updatedProfile: UserProfileUpdated = {
  email: 'roman.nichi.o@gmail.com',
  firstName: 'Роман',
  lastName: 'Ничипуренко',
  patronymic: 'Олегович',
  birthDate: '28-06-2003',
  sex: 'Мужской',
  phone: '8-927-777-77-77',
}