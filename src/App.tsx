import React from 'react'
import './App.css'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Game from '@/pages/game'
import Home from '@/pages/home'
import Page404 from '@/pages/common/Page404'
import useMediaQuery from '@mui/material/useMediaQuery'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

function App() {
  const prefersDarkMode =
    localStorage.getItem('isDarkTheme') === 'true' ??
    useMediaQuery('(prefers-color-scheme: dark)')

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode]
  )

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div>
          <Switch>
            <Route path='/' component={Home} exact />
            <Route path='/game' component={Game} exact />
            <Route path='/404' component={Page404} />
            <Redirect from='*' to='/404' />
          </Switch>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
