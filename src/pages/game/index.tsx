import React, { useContext, useEffect, useState } from 'react'
import Scoreboard from '../../components/scoreboard/Scoreboard'
import GameContainer from '../../components/containers/GameContainer'
import { Button, Stack } from '@mui/material'
import OperationButton from '../../components/buttons/OperationButton'
import RigidButton from '../../components/buttons/RigidButton'
import { UserContext } from '../../contexts/userContext'
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
import useSound from 'use-sound'
import timeEnd from '../../assets/audio/timeEnd.mp3'
import timeEndWrong from '../../assets/audio/timeEndWrong.mp3'
import {
  PlayerGameInfo,
  PlayerInfo,
  SocketContext,
} from '../../contexts/socketContext'
import { playerInfoToPlayerGameInfo } from '../../utils/playerInfoToPlayerGameInfo'

const Game = () => {
  const { gameInfo, playerInfos } = useContext(SocketContext)
  const history = useHistory()
  const defaultPlayer = { username: '', score: 0, timeUsed: 0 }

  const OPERATION_SIGNS = ['+', '-', '×', '÷']
  const dummyQuestion = [1, 2, 3, 4, 5]
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
  const [isRoundWinner, setRoundWinner] = useState(true) // dummy data, wait for socket

  // The scores of the players during the game will be tracked using these states locally
  const [player1, setPlayer1] = useState<PlayerGameInfo>(defaultPlayer)
  const [player2, setPlayer2] = useState<PlayerGameInfo>(defaultPlayer)

  const shouldShowGame = () => !showRoundEnd // gameRunning &&
  const shouldShowRoundEnd = () => showRoundEnd && !shouldShowGameEnd()
  const shouldShowGameEnd = () => showRoundEnd && false // use isLastRound when socket is available
  const isCorrectSolution = () => targetNumber === currentResult

  const [playWinSfx] = useSound(timeEnd)
  const [playLoseSfx] = useSound(timeEndWrong)

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
    if (currentResult !== null)
      setNumberOptions([currentResult, ...filteredNum])
  }

  const endRound = () => {
    setShowRoundEnd(true)
    setRoundWinner(isCorrectSolution())
    if (isCorrectSolution()) playWinSfx()
    else playLoseSfx()
    clearInputs()
  }

  const resetRound = () => {
    setShowRoundEnd(false)
    clearInputs()
    setNumberOptions(dummyQuestion)
  }

  const resetGame = () => {
    clearInputs()
    resetRound()
    setShowRoundEnd(false)
  }

  const leaveGame = () => {
    // socket leave game event
    // redirect user to home
    setShowleaveGameAlert(false)
    history.push('/')
  }

  useEffect(() => {
    if (!gameInfo) history.replace('/')

    // TODO: Figure out the types later
    if (playerInfos && playerInfos[0])
      setPlayer1(playerInfoToPlayerGameInfo(playerInfos[0]))
    if (playerInfos && playerInfos[1])
      setPlayer2(playerInfoToPlayerGameInfo(playerInfos[1]))
    // randomNameClient
    //   .get('/Name?nameType=firstname&quantity=2')
    //   .then(({ data }) => {
    //     if (!player2?.username)
    //       setPlayer2({ username: `Bot ${data[1]}`, score: 0 })
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
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
      setRoundWinner(isCorrectSolution())
      if (numberOptions.length <= 2) {
        setShowCorrectStatus(true)
        if (result === targetNumber) playWinSfx()
        else playLoseSfx()
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
                      <CountDownTimer onComplete={endRound} />
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
                        <h2
                          className={`${
                            targetNumber === currentResult ? 'correct' : 'wrong'
                          }-status`}
                        >
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
                            onClick={(operation) =>
                              setSelectedOperator(operation)
                            }
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
                          marginBottom: '12px',
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
                  <div className='round-end-options-container'>
                    {isRoundWinner ? (
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
                        Reset round
                      </Button>
                    ) : (
                      <Solution />
                    )}
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
                      play again
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
