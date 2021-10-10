import { Paper } from '@mui/material'
import React from 'react'

const GameContainer = ({ children }: any) => {
  return (
    <div className='paper-container'>
      <Paper elevation={0} className='game-container main-layer'>
        {children}
      </Paper>
      <Paper elevation={0} className='game-container highlight-layer'></Paper>
    </div>
  )
}

export default GameContainer
