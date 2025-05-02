import { DepartmentsSlider } from './DepartmentsSlider/DepartmentsSlider'
import './Home.scss'
import { bannerData } from './HomeData/bannerData'

export const Home = () => {
  return (
    <div className="home">
      <div className="banner">
        <div className="banner__content">
          <div className="banner__header">
            <h1 className="heading_1 banner__title">{bannerData.title}</h1>

            <h5 className="heading_5 banner__subtitle">
              {bannerData.subtitle}
            </h5>
          </div>

          <div className="banner__features">
            {bannerData.features.map((text, idx) => (
              <p key={idx} className="body_xl_m">
                {text}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="departments-list">
        <DepartmentsSlider />
      </div>
      <h1>Home</h1>
    </div>
  )
}
