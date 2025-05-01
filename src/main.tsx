import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Login from './pages/Login/Login.tsx'
import { Provider } from 'react-redux'
import { setupStore } from './redux/store.ts'
import Profile from './pages/Profile/Profile.tsx'
import { EventCreate } from './pages/EventCreate/EventCreate.tsx'
import '../src/assets/styles/style.scss'
import './assets/styles/style.scss'
import { Event } from './pages/Event/Event.tsx'
import moment from 'moment'
import { EventCalendar } from './pages/EventCalendar/EventCalendar.tsx'
import { QuestCreate } from './pages/QuestCreate/QuestCreate.tsx'
import { Header } from './components/Header/Header.tsx'
import { Footer } from './components/Footer/Footer.tsx'

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

document.documentElement.lang = 'ru' // Добавляем атрибут lang

root.render(
  <BrowserRouter>
    <Provider store={setupStore()}>
      <div className="app-root">
        <main className="main-content">
          <Header />
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="event/:id" element={<Event />} />
            <Route path="event/create" element={<EventCreate />} />
            <Route path="event/:id/edit" element={<EventCreate />} />
            <Route path="event/calendar" element={<EventCalendar />} />
            <Route path="quest/create" element={<QuestCreate />} />
            <Route path="quest/:id/edit" element={<QuestCreate />} />
          </Routes>
          <Footer />
        </main>
      </div>
    </Provider>
  </BrowserRouter>,
)
