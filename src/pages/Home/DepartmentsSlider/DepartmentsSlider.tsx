import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import { cardDepartmentData } from '../HomeData/cardDepartmentData'
import { CardDepartment } from '../CardDepartment/CardDepartment'
import 'swiper/css'
import 'swiper/css/navigation'
import './DepartmentSlider.scss'

export const DepartmentsSlider = () => {
  return (
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
        {cardDepartmentData.map((card, index) => (
          <SwiperSlide key={index}>
            <CardDepartment data={card} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
