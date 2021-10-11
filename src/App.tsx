import React, { useContext, useEffect } from 'react'
import './App.css'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Game from '@/pages/game'
import Home from '@/pages/home'
import Page404 from '@/pages/common/Page404'
import useMediaQuery from '@mui/material/useMediaQuery'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeContext } from './contexts/themeContext'
import MenuAppBar from './components/common/NavBar'
import GameSettingsContextProvider from './contexts/gameSettingsContext'

function App() {
  const { theme: appTheme } = useContext(ThemeContext)
  const prefersDarkMode =
    localStorage.getItem('isDarkTheme') === 'true' ??
    useMediaQuery('(prefers-color-scheme: dark)')

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode && appTheme === 'dark' ? 'dark' : 'light',
          primary: {
            main: '#F56F54',
            contrastText: '#fff',
          },
          secondary: {
            main: '#F3C18E',
          },
        },
        breakpoints: {
          values: {
            xs: 0,
            sm: 600,
            md: 1000,
            lg: 1100,
            xl: 1536,
          },
        },
      }),
    [prefersDarkMode]
  )

  useEffect(() => {
    // save default values to localstorage if they are not available
    if (!window.localStorage.getItem('musicOn'))
      window.localStorage.setItem('musicOn', 'true')
    if (!window.localStorage.getItem('soundEffectOn'))
      window.localStorage.setItem('soundEffectOn', 'true')
    if (!window.localStorage.getItem('musicTrack'))
      window.localStorage.setItem('musicTrack', '0')
    if (!window.localStorage.getItem('background'))
      window.localStorage.setItem('background', '0')
    if (!window.localStorage.getItem('language'))
      window.localStorage.setItem('language', '0')

    document.body.classList.add(
      `page-background-${window.localStorage.getItem('background')}`
    )
  }, [])

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GameSettingsContextProvider>
          <CssBaseline />
          <MenuAppBar />
          <div style={{ marginTop: '90px' }}>
            <div className='page-background'>
              <Switch>
                <Route path='/' component={Home} exact />
                <Route path='/game' component={Game} exact />
                <Route path='/404' component={Page404} />
                <Redirect from='*' to='/404' />
              </Switch>
            </div>
          </div>
        </GameSettingsContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
