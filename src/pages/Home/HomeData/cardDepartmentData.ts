export interface CardDepartmentData {
  title: string
  imageUrl: string
  description: string
  buttonText?: string
  buttonLink?: string
}

export const cardDepartmentData: CardDepartmentData[] = [
  {
    title: 'Кафедра связей с общественностью',
    description:
      'Формируем профессионалов в области коммуникаций, PR и корпоративных медиа для эффективного взаимодействия с аудиторией и построения репутации организаций.',
    buttonText: 'Подробнее',
    buttonLink: 'https://taom.academy/vuz/faculty_publicrelations',
    imageUrl: 'src/assets/images/publicRelations.png',
  },
  {
    title: 'Кафедра прикладной информатики и высшей математики',
    description:
      'Обучаем созданию и внедрению современных IT-решений, цифровой трансформации и аналитике данных с опорой на фундаментальные математические знания.',
    buttonText: 'Подробнее',
    buttonLink: 'https://taom.academy/vuz/faculty_informatics',
    imageUrl: 'src/assets/images/informatics.png',
  },
  {
    title: 'Кафедра экономики и финансов',
    description:
      'Готовим специалистов для анализа, планирования и управления финансовыми потоками в бизнесе и государственном секторе с учётом современных экономических реалий.',
    buttonText: 'Подробнее',
    buttonLink: 'https://taom.academy/vuz/faculty_economics',
    imageUrl: 'src/assets/images/economics.png',
  },
  {
    title: 'Кафедра управления',
    description:
      'Развиваем управленческие компетенции для эффективного руководства проектами, командами и организациями в условиях динамичного рынка.',
    buttonText: 'Подробнее',
    buttonLink: 'https://taom.academy/vuz/faculty_managment',
    imageUrl: 'src/assets/images/management.png',
  },
  {
    title: 'Кафедра дизайна',
    description:
      'Формируем творческих профессионалов в области графического, цифрового и коммуникационного дизайна, способных создавать современные визуальные решения.',
    buttonText: 'Подробнее',
    buttonLink: 'https://taom.academy/vuz/faculty_design',
    imageUrl: 'src/assets/images/design.png',
  },
]
