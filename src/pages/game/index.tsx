import React, { useContext, useEffect, useState } from 'react'
import Scoreboard from '../../components/scoreboard/Scoreboard'
import GameContainer from '../../components/containers/GameContainer'
import { Button, Stack } from '@mui/material'
import OperationButton from '../../components/buttons/OperationButton'
import RigidButton from '../../components/buttons/RigidButton'
import { UserContext } from '../../contexts/userContext'
import PlayerScores from './components/PlayerScores'
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
  GameInfo,
  PlayerGameInfo,
  Question,
  SocketContext,
} from '../../contexts/socketContext'
import { playerInfoToPlayerGameInfo } from '../../utils/playerInfoToPlayerGameInfo'

type Views = 'GAME' | 'WAITING' | 'ROUND_END' | 'GAME_END'

const Game = () => {
  const {
    socket,
    gameInfo,
    setGameInfo,
    playerInfos,
    nextTurn,
    nextRound,
    startGame,
    settings,
    endRound,
    setWinnerUsername,
  } = useContext(SocketContext)
  const { user } = useContext(UserContext)

  const history = useHistory()
  const defaultPlayer = { username: '', score: 0, timeUsed: 0 }

  const OPERATION_SIGNS = ['+', '-', '×', '÷']
  const [numberOptions, setNumberOptions] = useState<number[]>([])
  const [questions, setQuestions] = useState<Question[]>()
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
  const [isMyTurn, setIsMyTurn] = useState(false)
  const [isRoundWinner, setRoundWinner] = useState(true) // dummy data, wait for socket

  // The scores of the players during the game will be tracked using these states locally
  const [player1, setPlayer1] = useState<PlayerGameInfo>(defaultPlayer)
  const [player2, setPlayer2] = useState<PlayerGameInfo>(defaultPlayer)

  const [roundTime, setRoundTime] = useState<number[]>([0, 0])

  const [view, setView] = useState<Views>('WAITING')
  const shouldShowGame = () => isMyTurn && !shouldShowRoundEnd()
  const shouldShowWaitingScreen = () => !isMyTurn && !showRoundEnd
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
    const copyNumOptions = [...numberOptions]
    selectedOperands.forEach((operand) => {
      for (let i = 0; i < copyNumOptions.length; i++) {
        if (copyNumOptions[i] === operand) {
          copyNumOptions.splice(i, 1)
          break
        }
      }
    })
    if (currentResult !== null)
      setNumberOptions([currentResult, ...copyNumOptions])
  }

  const resetButtons = () => {
    clearInputs()
    if (!gameInfo) return
    if (questions) setNumberOptions(questions[gameInfo.currentRound - 1].number)
    resetRound()
  }

  const startNextRound = () => {
    nextRound()
    setTimeout(() => {
      resetRound()
    }, 1000)
  }

  const endPlayerRound = () => {
    setTimeout(() => {
      setView('ROUND_END') // setShowRoundEnd(true)
      setRoundWinner(isCorrectSolution())
      if (isCorrectSolution()) playWinSfx()
      else playLoseSfx()
      clearInputs()
    }, 1000)
  }

  const resetRound = () => {
    // clearInputs()
    // change question to the current round's
    if (gameInfo) {
      const currentQuestion = gameInfo.questions[gameInfo.currentRound - 1]
      setNumberOptions(currentQuestion.number)
      console.log('currentQuestion', currentQuestion)
      const newTarget = (): number => {
        let intermediate = currentQuestion.number[0]
        for (let i = 0; i < currentQuestion.operator.length; i++) {
          intermediate = calculateResult(
            intermediate,
            currentQuestion.number[i + 1],
            OPERATION_SIGNS[currentQuestion.operator[i]]
          )
        }
        return intermediate
      }
      setTargetNumber(newTarget())
    }
  }

  const resetGame = () => {
    clearInputs()
    resetRound()
    setShowRoundEnd(false)
    setView('WAITING')
  }

  const leaveGame = () => {
    // socket leave game event
    // redirect user to home
    setShowleaveGameAlert(false)
    history.push('/')
  }

  // socket implementation
  useEffect(() => {
    if (!socket) return
    startGame()

    socket.on('startNextTurn', (info: GameInfo) => {
      console.log('startNextTurn')
      setTimeout(() => {
        console.log(user?.username, info?.firstPlayer)
        resetRound()
        if (user?.username !== info?.firstPlayer) setView('GAME')
        else setView('WAITING')
        const now = new Date()
        setRoundTime([now.getTime(), roundTime[1]])
      }, 1000)
    })

    socket.on('startRound', (gameInfo: GameInfo) => {
      console.log('startRound')
      console.log('with gameinfo', gameInfo)
      setQuestions(gameInfo.questions)
      setGameInfo(gameInfo)
      // If your username is firstPlayer then u start playing game
      // If not waiting na
      // Don’t care na

      setTimeout(() => {
        const now = new Date()
        setRoundTime([now.getTime(), roundTime[1]])
        resetRound()
      }, 1000)
      if (user?.username === gameInfo?.firstPlayer) setView('GAME')
      else setView('WAITING')
    })

    socket.on('announceWinner', (username: string) => {
      console.log('announceWinner')
      setWinnerUsername(username)
      setTimeout(() => {
        setView('ROUND_END')
      }, 1000)
    })
  }, [])

  // guard unauthorized user and set player info
  useEffect(() => {
    // if (!gameInfo) history.replace('/')

    // TODO: Figure out the types later
    if (playerInfos && playerInfos[0])
      setPlayer1(playerInfoToPlayerGameInfo(playerInfos[0]))
    if (playerInfos && playerInfos[1])
      setPlayer2(playerInfoToPlayerGameInfo(playerInfos[1]))
  }, [])

  useEffect(() => {
    if (gameInfo) {
      const now = new Date()
      // roundTime[0] = now.getTime()
      const currentQuestion = gameInfo.questions[gameInfo.currentRound - 1]
      setNumberOptions(currentQuestion.number)
      console.log('currentQuestion', currentQuestion)
      const newTarget = (): number => {
        let intermediate = currentQuestion.number[0]
        for (let i = 0; i < currentQuestion.operator.length; i++) {
          intermediate = calculateResult(
            intermediate,
            currentQuestion.number[i + 1],
            OPERATION_SIGNS[currentQuestion.operator[i]]
          )
        }
        return intermediate
      }
      setTargetNumber(newTarget())
    }
  }, [view])

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
        // displays the answer correctness
        setShowCorrectStatus(true)

        // case correct answer
        if (result === targetNumber) {
          playWinSfx()
          const now = new Date()
          setRoundTime([roundTime[0], now.getTime()])
          const timeDiff = Math.floor((roundTime[1] - roundTime[0]) / 1000)

          if (
            user &&
            currentResult !== null &&
            user?.username === gameInfo?.firstPlayer
          ) {
            console.log(roundTime)
            console.log('next turn with ', {
              username: user.username,
              timeUsed: timeDiff,
            })
            nextTurn({ username: user.username, timeUsed: timeDiff })
          } else if (
            user &&
            currentResult &&
            user?.username !== gameInfo?.firstPlayer
          ) {
            endRound({ username: user.username, timeUsed: timeDiff })
          }
          setView('WAITING')
        }

        // case wrong answer
        else {
          playLoseSfx()
          setTimeout(() => {
            clearInputs()
          }, 1000)
        }
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
          <PlayerScores
            player1={gameInfo?.player1 ?? player1}
            player2={gameInfo?.player2 ?? player2}
          />
          <div className='game-page-container'>
            <div className='home-options-container'>
              <div className='scoreboard'>
                <Scoreboard small={true} />
              </div>
            </div>
            <div className='play-area'>
              <div className='game-display'>
                {
                  /*shouldShowGame() */ view === 'GAME' && (
                    <div>
                      <div className='question-container'>
                        <CountDownTimer
                          onComplete={endPlayerRound}
                          duration={settings?.timeLimit ?? 60}
                        />
                        <h3>{`Target Number: ${targetNumber}`}</h3>
                      </div>
                      <div className='working-container'>
                        <div className='number-slot'>{selectedOperands[0]}</div>
                        <div className='operator-slot'>{selectedOperator}</div>
                        <div className='number-slot'>{selectedOperands[1]}</div>
                        =<div className='number-slot'>{currentResult}</div>
                      </div>
                      {showCorrectStatus && (
                        <div>
                          <h2
                            className={`${
                              targetNumber === currentResult
                                ? 'correct'
                                : 'wrong'
                            }-status`}
                          >
                            {targetNumber === currentResult
                              ? 'CORRECT'
                              : 'WRONG'}
                          </h2>
                        </div>
                      )}
                    </div>
                  )
                }
                {
                  /*shouldShowWaitingScreen()*/ view === 'WAITING' && (
                    <div>please wait</div>
                  )
                }
                {
                  /*shouldShowRoundEnd() */ view === 'ROUND_END' && (
                    <RoundEnd player1={player1} player2={player2} />
                  )
                }
                {
                  /* shouldShowGameEnd() */ view === 'GAME_END' && (
                    <GameEnd
                      player1={'Pointzaa'}
                      player2={'Notezaa'}
                      player1Score={3}
                      player2Score={2}
                    />
                  )
                }
              </div>
              <div className='option-display'>
                {
                  /*shouldShowGame() */ view === 'GAME' && (
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
                                  setSelectedOperands([
                                    selectedOperands[0],
                                    num,
                                  ])
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
                            marginBottom: '12px',
                          }}
                          onClick={resetButtons}
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
                  )
                }
                {
                  /*shouldShowRoundEnd() */ view === 'ROUND_END' && (
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
                          onClick={startNextRound}
                        >
                          Next round
                        </Button>
                      ) : (
                        <Solution />
                      )}
                    </div>
                  )
                }
                {
                  /* shouldShowGameEnd() */ view === 'GAME_END' && (
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
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </GameContainer>
    </>
  )
}

export default withUserGuard(Game)
