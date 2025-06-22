import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import { CardDepartment } from '../CardDepartment/CardDepartment'
import 'swiper/css'
import 'swiper/css/navigation'
import './DepartmentSlider.scss'
import { useEffect, useState } from 'react'
import { Department } from '../../../models/department'
import { commonEntities } from '../../../services/api/commonModule/commonEntities/commonEntities'
import { Loading } from '../../../components/Loading/Loading'

export const DepartmentsSlider = () => {
  const [isLoading, setIsLoading] = useState(true)

  const [departments, setDepartments] = useState<Department[]>([])

  useEffect(() => {
    setIsLoading(true)
    fetchDepartments()
    setIsLoading(false)
  }, [])

  const fetchDepartments = async () => {
    try {
      const departments = await commonEntities.getDepartments()
      setDepartments(departments)
    } catch (e) {
      console.log(`[DepartmentsSlider] ${e}`)
    }
  }

  return (
    <>
      {!isLoading ? (
        <div className="departments-slider">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation
            loop
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              600: { slidesPerView: 2 },
              900: { slidesPerView: 3 },
            }}
            speed={900}
          >
            {departments.map((department, index) => (
              <SwiperSlide key={index}>
                <CardDepartment department={department} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}
