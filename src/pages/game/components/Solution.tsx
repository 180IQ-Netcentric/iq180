import { Button } from '@mui/material'
import React, { useContext } from 'react'
import { SocketContext } from '../../../contexts/socketContext'

type Props = {
  startNextRound: () => void
}

export default function Solution(props: Props) {
  const { startNextRound } = props
  const OPERATION_SIGNS = ['+', '-', '×', '÷']
  const { gameInfo } = useContext(SocketContext)

  const formattedSolution = () => {
    if (!gameInfo) return null
    const currentQuestion = gameInfo.questions[gameInfo.currentRound - 1]
    gameInfo.questions[gameInfo.currentRound - 1]
    gameInfo.questions[gameInfo.currentRound - 1]
    gameInfo.questions[gameInfo.currentRound - 1]
    let sol = ''
    for (let i = 0; i < currentQuestion.operator.length; i++) {
      sol += currentQuestion.number[i].toString() + ' '
      sol += OPERATION_SIGNS[currentQuestion.operator[i]] + ' '
    }
    sol += currentQuestion.number[currentQuestion.number.length - 1]
    sol += ' = ' + currentQuestion.result
    return sol
  }

  return (
    <div className='show-solution'>
      <div>
        <div style={{ fontSize: '24px' }}>Solution</div>
        <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
          <span>{formattedSolution()}</span>
        </div>
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
      </div>
    </div>
  )
}
