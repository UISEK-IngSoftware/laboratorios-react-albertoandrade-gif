import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import useMediaQuery from '@mui/material/useMediaQuery'
import './index.css'
import App from './App.jsx'
import { darkTheme, lightTheme } from './theme/theme.js'

export function RootApp() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const activeTheme = prefersDarkMode ? darkTheme : lightTheme

  return (
    <ThemeProvider theme={activeTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RootApp />
  </StrictMode>,
)
