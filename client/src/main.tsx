import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from './components/ui/sonner.tsx'
import { Provider } from 'react-redux'
import store from './redux/store.ts'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist';

let persistor = persistStore(store)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Toaster />
      <App />
      </PersistGate>
    </Provider>
  </StrictMode>,
)