import React, { useState } from 'react'
import Scoreboard from '../../components/scoreboard/Scoreboard'
import GameContainer from '../../components/containers/GameContainer'
import { Button, Stack } from '@mui/material'
import OperationButton from '../../components/buttons/OperationButton'
import RigidButton from '../../components/buttons/RigidButton'
const Game = () => {
  const OPERATION_SIGN = ['+', '-', '×', '÷']
  const [selectedRoundsCount, setSelectedRoundsCount] = useState('+')
  return (
    <>
      <GameContainer>
        <div className='playerScore'>
          <h2 className='section-title'>Player info</h2>
        </div>
        <div className=''>
          <div className='game-page-container '>
            <div className='home-options-container'>
              <div className='scoreboard'>
                <Scoreboard small />
              </div>
            </div>
            <div className='play-area'>
              play area
              <div className='display'>display number</div>
              <div className='game-buttons-container'>
                <div className='operations-container'>
                  <Stack
                    direction='row'
                    justifyContent='space-between'
                    spacing={1}
                    className='button-row'
                  >
                    <RigidButton>1</RigidButton>
                    <RigidButton>1</RigidButton>
                    <RigidButton>1</RigidButton>
                    <RigidButton>1</RigidButton>
                    <RigidButton>1</RigidButton>
                  </Stack>
                  <Stack
                    direction='row'
                    justifyContent='space-between'
                    spacing={1}
                    className='button-row'
                  >
                    <OperationButton>+</OperationButton>
                    <OperationButton>-</OperationButton>
                    <OperationButton>×</OperationButton>
                    <OperationButton>÷</OperationButton>
                  </Stack>
                </div>
                <div className='controls-container'>
                  <Button
                    variant='contained'
                    sx={{
                      backgroundColor: 'primary',
                      height: '48px',
                      width: '100%',
                    }}
                    className='button-row'
                  >
                    Reset
                  </Button>
                  <Button
                    variant='contained'
                    sx={{
                      backgroundColor: '#D14835',
                      height: '48px',
                      width: '100%',
                    }}
                  >
                    Leave Game 🏳️
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </GameContainer>
    </>
  )
}

export default Game
