import React from 'react'

type Props = {
  player1: string
  player2: string
  player1Time: number
  player2Time: number
}
export const RoundEnd = (props: Props) => {
  const { player1, player2, player1Time, player2Time } = props

  return (
    <div className='round-end'>
      <span style={{ fontSize: '24px' }}>Time Elapsed</span>
      <div className='game-result'>
        <div className='player-name'>{player1}</div>
        <div className='score-value'>{player1Time}</div>
      </div>
      <div className='game-result'>
        <div className='player-name'>{player2}</div>
        <div className='score-value'>{player2Time}</div>
      </div>
      <div>
        <div className='show-winner' style={{ fontSize: '24px' }}>
          Winner
        </div>
        <div className='show-winner' style={{ fontSize: '36px' }}>
          {player1Time > player2Time ? player1 : player2}
        </div>
      </div>
    </div>
  )
}
