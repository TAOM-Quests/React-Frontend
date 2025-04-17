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
  phone: '898-888-88-88',
  completedQuests: [],
}

export const employeeProfile: UserProfileEmployee = {
  id: 1,
  email: 'roman.nichi@gmail.com',
  firstName: 'Roman',
  lastName: 'Nichi',
  patronymic: 'Olegovich',
  birthDate: new Date('08-12-2003'),
  sex: 'Male',
  phone: '897-777-77-77',
  completedQuests: [],
  position: 'Преподаватель',
  department: 'ПИ',
}
