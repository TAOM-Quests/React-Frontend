import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import LoginPage from './pages/Login/Login.tsx'
import { Provider } from 'react-redux'
import { setupStore } from './redux/store.ts'
import { DropdownProvider } from './components/UI/Dropdown/DropdownContext.tsx'

createRoot(document.getElementById('root')!).render(
  <DropdownProvider>
    <BrowserRouter>
      <Provider store={setupStore()}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Provider>
    </BrowserRouter>
    ,
  </DropdownProvider>,
)
