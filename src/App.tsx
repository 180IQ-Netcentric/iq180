import React from 'react'
import './App.css'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Game from '@/pages/game'
import Home from '@/pages/home'
import Page404 from '@/pages/common/Page404'

function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/game' component={Game} exact />
          <Route path='/404' component={Page404} />
          <Redirect from='*' to='/404' />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
