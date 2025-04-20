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

const container = document.getElementById('root')
const root = createRoot(container!)

document.documentElement.lang = 'ru' // Добавляем атрибут lang

root.render(
  <BrowserRouter>
    <Provider store={setupStore()}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="event/create" element={<EventCreate />} />
        <Route path="event/:id/edit" element={<EventCreate />} />
      </Routes>
    </Provider>
  </BrowserRouter>,
)
