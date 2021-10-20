import React from 'react'
type Props = {
  player1: string
  player2: string
  player1Score: number
  player2Score: number
}
export const GameEnd = (props: Props) => {
  const { player1, player2, player1Score, player2Score } = props
  return (
    <div className='game-end'>
      <span style={{ fontSize: '24px' }}>Final Score</span>
      <div className='game-result'>
        <div className='player-name'>{player1}</div>
        <div className='score-value'>{player1Score}</div>
      </div>
      <div className='game-result'>
        <div className='player-name'>{player2}</div>
        <div className='score-value'>{player2Score}</div>
      </div>
      <div>
        <div className='show-winner' style={{ fontSize: '24px' }}>
          Game Winner 🏆
        </div>
        <div className='show-winner' style={{ fontSize: '36px' }}>
          {player1Score > player2Score ? player1 : player2}
        </div>
      </div>
    </div>
  )
}
