import { UserAuth } from '../../../../../models/userAuth'
import {
  UserProfile,
  UserProfileUpdated,
} from '../../../../../models/userProfile'
import { ProfileUpdateDto } from '../../../../../services/api/userModule/users/usersDto'

export const user: UserAuth = {
  id: 2,
  email: 'marika.meidra@gmail.com',
  token: 'testToken',
  name: '',
}

export const userProfile: UserProfile = {
  id: 2,
  email: 'marika.meydra@gmail.com',
  firstName: 'Marika',
  lastName: 'Meidra',
  patronymic: 'Robertovna',
  birthDate: new Date('07-08-2003'),
  sex: 'Female',
  phoneNumber: '898-888-88-88',
  completedQuests: [],
  image: {
    id: 2,
    url: 'testUrl',
    originalName: 'testName',
    size: 0,
    extension: 'jpg',
    name: 'testName',
  },
}

export const typePersonFields: ProfileUpdateDto = {
  id: 2,
  email: 'roman.nichi.o@gmail.com',
  firstName: 'Роман',
  lastName: 'Ничипуренко',
  patronymic: 'Олегович',
  birthDate: '28-06-2003',
  sex: 'Мужской',
  phoneNumber: '8-927-777-77-77',
}

export const updatedProfile: UserProfileUpdated = {
  email: 'roman.nichi.o@gmail.com',
  firstName: 'Роман',
  lastName: 'Ничипуренко',
  patronymic: 'Олегович',
  birthDate: '28-06-2003',
  sex: 'Мужской',
  phoneNumber: '8-927-777-77-77',
}
