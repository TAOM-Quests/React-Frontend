import './Home.scss'

interface BannerData {
  title: string
  subtitle: string
  features: string[]
}

export const bannerData: BannerData = {
  title: 'Найди свой путь к успеху',
  subtitle: 'Тольяттинская академия управления ждет тебя',
  features: [
    'Добро пожаловать на онлайн-платформу Тольяттинской академии управления!',
    'Здесь вы найдете подробную информацию о кафедрах, их квестах, играх и актуальных мероприятиях',
    'А также вы будете получать очки опыта за активность, тем самым повышая свой уровень на нашей онлайн-платформе!',
  ],
}

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
      <h1>Home</h1>
    </div>
  )
}
