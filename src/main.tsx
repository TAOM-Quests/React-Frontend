import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import LoginPage from './pages/Login/Login.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Provider store={store}>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
      </Provider>
    </Routes>
  </BrowserRouter>,
)
