import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import LoginPage from './pages/Login/Login.tsx'
import { Provider } from 'react-redux'
import { setupStore } from './redux/store.ts'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={setupStore()}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Provider>
  </BrowserRouter>,
)
