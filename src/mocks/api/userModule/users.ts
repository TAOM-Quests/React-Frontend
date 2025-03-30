import { http, HttpHandler, HttpResponse } from "msw"
import { UserProfile, UserProfileEmployee } from "../../../models/userProfile"

export const usersHandlers: HttpHandler[] = [
  http.get('/api/v1/userModule/users/1/profile', () => {
    return HttpResponse.json<UserProfile>({
      id: 1,
      email: "marika.meydra@gmail.com",
      firstName: "Марика",
      lastName: "Мейдра",
      patronymic: "Робертовна",
      birthDate: new Date("07.08.2003"),
      sex: "Женский",
      phone: "8-927-999-99-99",
      completedQuests: []
    })
  }),
  http.get('/api/v1/userModule/users/2/profile', () => {
    return HttpResponse.json<UserProfileEmployee>({
      id: 2,
      email: "roman.nichi.o@gmail.com",
      firstName: "Роман",
      lastName: "Ничипуренко",
      patronymic: "Олегович",
      birthDate: new Date("28.06.2003"),
      sex: "Мужской",
      phone: "8-927-777-77-77",
      department: "Дизайн",
      role: "Администратор",
      completedQuests: [],
      position: "Призедент Академии"
    })
  }),
  http.get('/api/v1/userModule/users/3/profile', () => {
    return HttpResponse.json<UserProfileEmployee>({
      id: 3,
      email: "marika.nichi@gmail.com",
      firstName: "Роман",
      lastName: "Мейдра",
      patronymic: "Робегович",
      birthDate: new Date("17.07.2003"),
      sex: "Мужской",
      phone: "8-927-777-77-77",
      department: "Менеджемент",
      role: "Преподаватель",
      completedQuests: [],
      position: "Преподаватель кафедры ПИ"
    })
  })
]