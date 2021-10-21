import React, { useContext } from 'react'
import { Button } from '@mui/material'
import GameContainer from '../../components/containers/GameContainer'

import CoverImg from '../../assets/images/coverImg.png'
import BouncingArrow from '../../components/common/BouncingArrow'
import Scoreboard from '../../components/scoreboard/Scoreboard'
import { Theme, ThemeContext } from '../../contexts/themeContext'
import { useHistory } from 'react-router'

const Home = () => {
  const { theme: appTheme } = useContext(ThemeContext)
  const history = useHistory()

  return (
    <div>
      <GameContainer>
        <div className='game-padding'>
          <div className='game-cover'>
            <img src={CoverImg} alt='IQ180 Cover' />
          </div>
          <div className='game-description'>
            <h1>Battle your brains out! 🧠</h1>
            <h4>Join xxx players online right now</h4>
            <p>
              IQ180 is a game that is ... Lorem ipsum dolor sit amet,
              consectetur adipiscing elit, sed do eiusmod tempor incididunt
            </p>
            <Button
              variant='contained'
              size='large'
              sx={{ width: '100%', borderRadius: '15px' }}
              onClick={() => history.push('/lobby')}
            >
              Play
            </Button>
          </div>
          <BouncingArrow />
          <div className='home-options-container'>
            <Scoreboard />
            <div
              className={`tutorial-container${
                appTheme === Theme.DARK ? '-dark' : ''
              }`}
            >
              <h2>Tips</h2>
            </div>
          </div>
        </div>
      </GameContainer>
    </div>
  )
}

export default Home
