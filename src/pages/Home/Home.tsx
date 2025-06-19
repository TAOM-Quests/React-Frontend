import { useEffect, useState } from 'react'
import { DepartmentsSlider } from './DepartmentsSlider/DepartmentsSlider'
import './Home.scss'
import { bannerData } from './HomeData/bannerData'
import { UpcomingEvents } from './UpcomingEvents/UpcomingEvents'
import { serverFiles } from '../../services/api/commonModule/serverFiles/serverFiles'

const BANNER_IMAGE_ID = 15

export const Home = () => {
  const [bannerImageUrl, setBannerImageUrl] = useState('')

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const bannerImage = await serverFiles.getFile(BANNER_IMAGE_ID)
        setBannerImageUrl(bannerImage.url)
      } catch (e) {
        console.log(`[Login] ${e}`)
      }
    }

    fetchImages()
  })

  return (
    <div className="home">
      <div className="banner">
        <img src={bannerImageUrl} alt="Banner" className="banner__image" />
        <div className="banner__overlay" />

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
      <div className="upcoming-events">
        <UpcomingEvents />
      </div>
    </div>
  )
}
