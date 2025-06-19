import { serverFiles } from '../../../services/api/commonModule/serverFiles/serverFiles'

export interface CardDepartmentData {
  title: string
  description: string
  getImageUrl: () => Promise<string>
  buttonText?: string
  buttonLink?: string
}

const DEPARTMENT_IMAGES_MAP = {
  PUBLIC_RELATIONS: 9,
  INFORMATICS: 10,
  ECONOMICS: 11,
  MANAGEMENT: 12,
  DESIGN: 13,
}

const getImageUrl = async (
  department: keyof typeof DEPARTMENT_IMAGES_MAP,
): Promise<string> =>
  (await serverFiles.getFile(DEPARTMENT_IMAGES_MAP[department])).url

export const cardDepartmentData: CardDepartmentData[] = [
  {
    title: 'Кафедра связей с общественностью',
    description:
      'Формируем профессионалов в области коммуникаций, PR и корпоративных медиа для эффективного взаимодействия с аудиторией и построения репутации организаций.',
    buttonText: 'Подробнее',
    buttonLink: 'https://taom.academy/vuz/faculty_publicrelations',
    getImageUrl: () => getImageUrl('PUBLIC_RELATIONS'),
  },
  {
    title: 'Кафедра прикладной информатики и высшей математики',
    description:
      'Обучаем созданию и внедрению современных IT-решений, цифровой трансформации и аналитике данных с опорой на фундаментальные математические знания.',
    buttonText: 'Подробнее',
    buttonLink: 'https://taom.academy/vuz/faculty_informatics',
    getImageUrl: () => getImageUrl('INFORMATICS'),
  },
  {
    title: 'Кафедра экономики и финансов',
    description:
      'Готовим специалистов для анализа, планирования и управления финансовыми потоками в бизнесе и государственном секторе с учётом современных экономических реалий.',
    buttonText: 'Подробнее',
    buttonLink: 'https://taom.academy/vuz/faculty_economics',
    getImageUrl: () => getImageUrl('ECONOMICS'),
  },
  {
    title: 'Кафедра управления',
    description:
      'Развиваем управленческие компетенции для эффективного руководства проектами, командами и организациями в условиях динамичного рынка.',
    buttonText: 'Подробнее',
    buttonLink: 'https://taom.academy/vuz/faculty_managment',
    getImageUrl: () => getImageUrl('MANAGEMENT'),
  },
  {
    title: 'Кафедра дизайна',
    description:
      'Формируем творческих профессионалов в области графического, цифрового и коммуникационного дизайна, способных создавать современные визуальные решения.',
    buttonText: 'Подробнее',
    buttonLink: 'https://taom.academy/vuz/faculty_design',
    getImageUrl: () => getImageUrl('DESIGN'),
  },
]
