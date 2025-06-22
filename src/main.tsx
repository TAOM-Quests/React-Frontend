import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import Login from './pages/Login/Login.tsx'
import { Provider } from 'react-redux'
import { setupStore } from './redux/store.ts'
import Profile from './pages/Profile/Profile.tsx'
import '../src/assets/styles/style.scss'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Event } from './pages/Event/Event.tsx'
import moment from 'moment'
import { EventCalendar } from './pages/EventCalendar/EventCalendar.tsx'
import { QuestCreate } from './pages/QuestCreate/QuestCreate.tsx'
import { Header } from './layout/Header/Header.tsx'
import { Footer } from './layout/Footer/Footer.tsx'
import { Home } from './pages/Home/Home.tsx'
import { Quest } from './pages/Quest/Quest.tsx'
import { ScrollToTop } from './layout/ScrollToTop.tsx'
import { NotificationToaster } from './layout/NotificationToaster/NotificationToaster.tsx'
import { EmailConfirm } from './pages/Login/EmailConfirm/EmailConfirm.tsx'
import { EventCreate } from './pages/EventCreate/EventCreate.tsx'
import { EventAnalytic } from './pages/EventAnalytic/EventAnalytic.tsx'
import { Games } from './pages/Games/Games.tsx'
import { Wordle } from './pages/Games/Wordle/Wordle.tsx'
import { Crossword } from './pages/Games/Crossword/Crossword.tsx'

moment.updateLocale('ru', {
  months: [
    'Январь',
    'Февраль',
    'Mарт',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ],
  monthsShort: [
    'Янв',
    'Фев',
    'Мар',
    'Апр',
    'Май',
    'Июн',
    'Июл',
    'Авг',
    'Сен',
    'Окт',
    'Ноя',
    'Дек',
  ],
})

const container = document.getElementById('root')
const root = createRoot(container!)

document.documentElement.lang = 'ru'

root.render(
  <BrowserRouter>
    <Provider store={setupStore()}>
      <div className="app-root">
        <main className="main-content">
          <Header />
          <ScrollToTop>
            <NotificationToaster />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="email/confirm" element={<EmailConfirm />} />

              <Route path="event/:id" element={<Event />} />
              <Route path="event/:id/statistic" element={<EventAnalytic />} />
              <Route path="event/create" element={<EventCreate />} />
              <Route path="event/:id/edit" element={<EventCreate />} />
              <Route path="event/calendar" element={<EventCalendar />} />

              <Route path="quest/:id" element={<Quest />} />
              <Route path="quest/complete/:completeId" element={<Quest />} />
              <Route path="quest/create" element={<QuestCreate />} />
              <Route path="quest/:id/edit" element={<QuestCreate />} />

              <Route path="games/:id" element={<Games />} />
              <Route path="games/wordle/:id" element={<Wordle />} />
              {/* <Route
                path="games/wordle/edit/:id"
                element={<WordleWordsEditor />}
              /> */}
            </Routes>
          </ScrollToTop>
          <Footer />
        </main>
      </div>
    </Provider>
  </BrowserRouter>,
)
