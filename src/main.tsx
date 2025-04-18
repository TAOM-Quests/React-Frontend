import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Login from './pages/Login/Login.tsx'
import { Provider } from 'react-redux'
import { setupStore } from './redux/store.ts'
import Profile from './pages/Profile/Profile.tsx'
import './assets/styles/style.scss'
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={setupStore()}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Provider>
  </BrowserRouter>,
)
