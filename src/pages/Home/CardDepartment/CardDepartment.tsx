import './CardDepartment.scss'
import { Button } from '../../../components/UI/Button/Button'
import { Department } from '../../../models/department'

interface CardDepartmentProps {
  department: Department
}

const DEPARTMENT_LINK_MAP: Record<number, string> = {
  1: 'https://taom.academy/vuz/faculty_informatics',
  2: 'https://taom.academy/vuz/faculty_publicrelations',
  3: 'https://taom.academy/vuz/faculty_economics',
  4: 'https://taom.academy/vuz/faculty_managment',
  5: 'https://taom.academy/vuz/faculty_design',
}

export const CardDepartment = ({ department }: CardDepartmentProps) => {
  const handleClick = () => {
    window.location.href = DEPARTMENT_LINK_MAP[department.id] ?? ''
  }

  return (
    <div className="card">
      <div className="card__image-wrapper">
        <img
          src={department.image.url}
          alt={department.name}
          className="card__image"
        />
      </div>
      <div className="card__content">
        <p className="body_l_sb card__title">{department.name}</p>
        <p className="body_m_r  card__description">{department.description}</p>

        <Button
          text={'Подробнее'}
          colorType="accent"
          onClick={handleClick}
          iconAfter="ARROW_SMALL_RIGHT"
        />
      </div>
    </div>
  )
}
