import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HeroUIProvider } from '@heroui/react'
import TokenContextProvider from './Context/TokenContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HeroUIProvider>
    <TokenContextProvider>

                <App />
                
    </TokenContextProvider>
    </HeroUIProvider>
  </StrictMode>,
)
