import React, { useContext, useEffect, useState } from 'react'
import Scoreboard from '../../components/scoreboard/Scoreboard'
import GameContainer from '../../components/containers/GameContainer'
import { Button, Stack } from '@mui/material'
import OperationButton from '../../components/buttons/OperationButton'
import RigidButton from '../../components/buttons/RigidButton'
import { UserContext } from '../../contexts/userContext'
import { PlayerGameInfo } from '../../dto/Authentication.dto'
import PlayerScores from './components/PlayerScores'
import { randomNameClient } from '../../config/axiosConfig'
import CountDownTimer from './components/GameCountdown'
import ErrorAlert from '../../components/alerts/ErrorAlert'
import { useHistory } from 'react-router'
import { RoundEnd } from './components/RoundEnd'
import { GameEnd } from './components/GameEnd'
import { ResetTvRounded } from '@mui/icons-material'
import withUserGuard from '../../guards/user.guard'
import Solution from './components/Solution'

const Game = () => {
  const { user } = useContext(UserContext)
  const history = useHistory()

  const OPERATION_SIGNS = ['+', '-', '×', '÷']
  const dummyQuestion = [[1, 2, 3, 4, 5], 15]
  const [numberOptions, setNumberOptions] = useState([1, 2, 3, 4, 5])
  const [selectedNumberKey, setSelectedNumberKey] = useState<number | null>(
    null
  )
  const [selectedOperator, setSelectedOperator] = useState<string>('')
  const [selectedOperands, setSelectedOperands] = useState<(number | null)[]>([
    null,
    null,
  ])
  const [currentResult, setCurrentResult] = useState<number | null>(null)
  const [showLeaveGameAlert, setShowleaveGameAlert] = useState(false)
  const [targetNumber, setTargetNumber] = useState(15)
  const [showCorrectStatus, setShowCorrectStatus] = useState(false)
  const [showRoundEnd, setShowRoundEnd] = useState(false)
  const [gameRunning, setGameRunning] = useState(true)

  // The scores of the players during the game will be tracked using these states locally
  const [player1, setPlayer1] = useState<PlayerGameInfo>({
    username: user?.username ?? 'You',
    score: 0,
  })
  const [player2, setPlayer2] = useState<PlayerGameInfo>({
    username: '',
    score: 0,
  })

  const shouldShowGame = () => gameRunning && !showRoundEnd
  const shouldShowRoundEnd = () => showRoundEnd && !shouldShowGameEnd()
  const shouldShowGameEnd = () => showRoundEnd && true // use isLastRound when socket is available

  const calculateResult = (num1: number, num2: number, operator: string) => {
    switch (operator) {
      case '+':
        return num1 + num2
      case '-':
        return num1 - num2
      case '×':
        return num1 * num2
      case '÷':
        return num1 / num2
    }
    return 0
  }

  const clearInputs = () => {
    setSelectedOperator('')
    setSelectedOperands([null, null])
    setCurrentResult(null)
    setSelectedNumberKey(null)
  }

  const updateButtons = () => {
    // remove the used numbers
    const filteredNum = numberOptions.filter((num) => {
      return !selectedOperands.includes(num)
    })
    if (currentResult) setNumberOptions([currentResult, ...filteredNum])
  }

  const endRound = () => {
    setShowRoundEnd(true)
    clearInputs()
  }

  const resetRound = () => {
    setShowRoundEnd(false)
    clearInputs()
    setNumberOptions(dummyQuestion[0])
  }

  const resetGame = () => {
    clearInputs()
    resetRound()
    setShowGameEnd(false)
  }

  const leaveGame = () => {
    // socket leave game event
    // redirect user to home
    setShowleaveGameAlert(false)
    history.push('/')
  }

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

  useEffect(() => {
    // auto calculates when the numbers and operators are input
    if (
      selectedOperator &&
      selectedOperands[0] !== null &&
      selectedOperands[1] !== null
    ) {
      const result = calculateResult(
        selectedOperands[0],
        selectedOperands[1],
        selectedOperator
      )
      setCurrentResult(result)
      if (numberOptions.length <= 2) {
        setShowCorrectStatus(true)
        setTimeout(() => {
          setShowRoundEnd(true)
        }, 1000)
      }
      setTimeout(() => {
        if (currentResult !== null) {
          updateButtons()
          clearInputs()
          setShowCorrectStatus(false)
        }
      }, 1000)
    }
  }, [selectedOperands, selectedOperator, currentResult])

  return (
    <>
      <ErrorAlert
        open={showLeaveGameAlert}
        setOpen={setShowleaveGameAlert}
        title='Alert'
        description='Are you sure you want to leave the game?'
        primaryAction={leaveGame}
        secondaryAction={() => setShowleaveGameAlert(false)}
      />
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
                {shouldShowGame() && (
                  <div>
                    <div className='question-container'>
                      <CountDownTimer onComplete={null/*endRound */} />
                      <h3>{`Target Number: ${targetNumber}`}</h3>
                    </div>
                    <div className='working-container'>
                      <div className='number-slot'>{selectedOperands[0]}</div>
                      <div className='operator-slot'>{selectedOperator}</div>
                      <div className='number-slot'>{selectedOperands[1]}</div>=
                      <div className='number-slot'>{currentResult}</div>
                    </div>
                    {showCorrectStatus && (
                      <div>
                        <h2 className={`${targetNumber === currentResult ? 'correct' : 'wrong'}-status`}>
                          {targetNumber === currentResult ? 'CORRECT' : 'WRONG'}
                        </h2>
                      </div>
                    )}
                  </div>
                )}
                {shouldShowRoundEnd() && (
                  <RoundEnd
                    player1={'Pointzaa'}
                    player2={'Notezaa'}
                    player1Time={34}
                    player2Time={36}
                  />
                )}
                {shouldShowGameEnd() && (
                  <GameEnd
                    player1={'Pointzaa'}
                    player2={'Notezaa'}
                    player1Score={3}
                    player2Score={2}
                  />
                )}
              </div>
              <div>
                <Solution>
                </Solution>
              </div>
              <div className='option-display'>
                {shouldShowGame() && (
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
                            disabled={
                              (!selectedOperator &&
                                !(selectedOperands[0] === null)) ||
                              index === selectedNumberKey
                            }
                            key={index}
                            onClick={() => {
                              if (selectedOperands[0] === null) {
                                setSelectedNumberKey(index)
                                setSelectedOperands([num, null])
                              } else {
                                setSelectedOperands([selectedOperands[0], num])
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
                        className='button-row-space-between'
                      >
                        {OPERATION_SIGNS.map((operation, index) => (
                          <OperationButton
                            key={index}
                            onClick={() => setSelectedOperator(operation)}
                          >
                            {operation}
                          </OperationButton>
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
                          marginBottom: '12px'
                        }}
                        onClick={resetRound}
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
                        onClick={() => setShowleaveGameAlert(true)}
                      >
                        Leave Game
                      </Button>
                    </div>
                  </div>
                )}
                {shouldShowRoundEnd() && (
                  <div>
                    <div className='round-end-options-container'>
                      <Button
                        variant='contained'
                        sx={{
                          backgroundColor: 'primary',
                          height: '48px',
                          width: '100%',
                        }}
                        className='button-row'
                        onClick={resetRound}
                      >
                        Reset
                      </Button>
                    </div>
                  </div>
                )}
                {shouldShowGameEnd() && (
                  <div className='controls-container'>
                    <Button
                      variant='contained'
                      sx={{
                        backgroundColor: 'primary',
                        height: '48px',
                        width: '100%',
                      }}
                      className='button-row'
                      onClick={resetGame}
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
                      onClick={() => setShowleaveGameAlert(true)}
                    >
                      Leave Game
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </GameContainer>
    </>
  )
}

export default withUserGuard(Game)
