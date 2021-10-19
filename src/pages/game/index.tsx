import React, { useContext, useEffect, useState } from 'react'
import Scoreboard from '../../components/scoreboard/Scoreboard'
import GameContainer from '../../components/containers/GameContainer'
import { Button, Stack } from '@mui/material'
import OperationButton from '../../components/buttons/OperationButton'
import RigidButton from '../../components/buttons/RigidButton'
import { UserContext } from '../../contexts/userContext'
import { PlayerGameInfo, User, UserInfo } from '../../dto/Authentication.dto'
import axios from 'axios'
import PlayerScores from './components/PlayerScores'
import { randomNameClient } from '../../config/axiosConfig'
import CountDownTimer from './components/GameCountdown'

const Game = () => {
  const OPERATION_SIGNS = ['+', '-', '×', '÷']
  const numberOptions = [1, 2, 3, 4, 5]
  const [selectedOperators, setSelectedOperators] = useState<string>('')
  const [selectedOperand, setSelectedOperand] = useState<(number | null)[]>([
    null,
    null,
  ])

  const { user } = useContext(UserContext)

  // The scores of the players during the game will be tracked using these states locally
  const [player1, setPlayer1] = useState<PlayerGameInfo>({
    username: user?.username ?? 'You',
    score: 0,
  })
  const [player2, setPlayer2] = useState<PlayerGameInfo>({
    username: '',
    score: 0,
  })

  useEffect(() => {
    setPlayer1({
      username: user?.username ?? 'You',
      score: 0,
    })
    randomNameClient
      .get('/Name?nameType=firstname&quantity=2')
      .then(({ data }) => {
        if (!player2?.username)
          setPlayer2({ username: `Bot ${data[1]}`, score: 0 })
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <>
      <GameContainer>
        <div className='game-padding'>
          <PlayerScores player1={player1} player2={player2} />
          <div className='game-page-container'>
            <div className='home-options-container'>
              <div className='scoreboard'>
                <Scoreboard small />
              </div>
            </div>
            <div className='play-area'>
              <div className='game-display'>
                {/* Logically display the corrent component based on the states */}
                <div className='question-container'>
                  <CountDownTimer />
                  <h3>{`Target Number: ${2}`}</h3>
                </div>
                <div className='working-container'>
                  <div className='number-slot'>{selectedOperand[0]}</div>
                  <div className='operator-slot'></div>
                  <div className='number-slot'>{selectedOperand[1]}</div>=
                  <div className='number-slot'></div>
                </div>
              </div>
              <div className='game-buttons-container'>
                <div className='operations-container'>
                  <Stack
                    direction='row'
                    justifyContent='space-between'
                    spacing={1}
                    className='button-row'
                  >
                    {numberOptions.map((num, index) => (
                      <RigidButton
                        key={index}
                        onClick={() => {
                          console.log('hi')
                          if (selectedOperand[0] === null) {
                            setSelectedOperand([num, null])
                          } else {
                            setSelectedOperand([selectedOperand[0], num])
                          }
                        }}
                      >
                        {num}
                      </RigidButton>
                    ))}
                  </Stack>
                  <Stack
                    direction='row'
                    justifyContent='space-between'
                    spacing={1}
                    className='button-row'
                  >
                    {OPERATION_SIGNS.map((operation, index) => (
                      <OperationButton key={index}>{operation}</OperationButton>
                    ))}
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
                    Leave Game
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
