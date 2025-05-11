import {
  UserProfile,
  UserProfileEmployee,
} from '../../../../models/userProfile'

export const userProfile: UserProfile = {
  id: 1,
  email: 'marika.meydra@gmail.com',
  firstName: 'Marika',
  lastName: 'Meidra',
  patronymic: 'Robertovna',
  birthDate: new Date('07-08-2003'),
  sex: 'Female',
  phoneNumber: '898-888-88-88',
  completedQuests: [],
  image: {
    id: 1,
    url: 'testUrl',
    originalName: 'testName',
    size: 0,
    extension: 'jpg',
    name: 'testName',
  },
}

export const employeeProfile: UserProfileEmployee = {
  id: 1,
  email: 'roman.nichi@gmail.com',
  firstName: 'Roman',
  lastName: 'Nichi',
  patronymic: 'Olegovich',
  birthDate: new Date('08-12-2003'),
  sex: 'Male',
  phoneNumber: '897-777-77-77',
  department: { id: 1, name: 'ПИ' },
  completedQuests: [],
  position: { id: 1, name: 'Преподаватель' },
  image: {
    id: 1,
    url: 'testUrl',
    originalName: 'testName',
    size: 0,
    extension: 'jpg',
    name: 'testName',
  },
}
