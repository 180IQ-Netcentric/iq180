import React from 'react'
import { Button } from '@mui/material'
import GameContainer from '../../components/containers/GameContainer'

import CoverImg from '../../assets/images/coverImg.png'
import BouncingArrow from '../../components/common/BouncingArrow'

const Home = () => {
  return (
    <div>
      <GameContainer>
        <div className='game-cover'>
          <img src={CoverImg} alt='IQ180 Cover' />
        </div>
        <div className='game-description'>
          <h1>Battle your brains out! 🧠</h1>
          <h4>Join xxx players online right now</h4>
          <p>
            IQ180 is a game that is ... Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt
          </p>
          <Button
            variant='contained'
            size='large'
            sx={{ width: '100%', borderRadius: '15px' }}
          >
            Play
          </Button>
        </div>
        <BouncingArrow />
        <div className='home-options-container'>
          <div className='scoreboard-container scoreboard-home'>
            <h2>Scoreboard</h2>
          </div>
          <div className='tutorial-container'>
            <h2>Tips</h2>
          </div>
        </div>
      </GameContainer>
    </div>
  )
}

export default Home
