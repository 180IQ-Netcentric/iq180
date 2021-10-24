import React, { useContext } from 'react'
import { PlayerGameInfo, SocketContext } from '../../../contexts/socketContext'

type Props = {
  player1: PlayerGameInfo
  player2: PlayerGameInfo
}
export const RoundEnd = (props: Props) => {
  const { gameInfo } = useContext(SocketContext)

  if (!gameInfo) return null
  const { player1, player2 } = gameInfo

  const winnerName = (player1: PlayerGameInfo, player2: PlayerGameInfo) => {
    if (player1.timeUsed === player2.timeUsed) return null
    else if (player1.timeUsed < player2.timeUsed) return player1.username
    else return player2.username
  }

  return (
    <div className='round-end'>
      <span style={{ fontSize: '24px' }}>Time Elapsed</span>
      <div className='game-result'>
        <div className='player-name'>{player1.username}</div>
        <div className='score-value'>{player1.timeUsed}</div>
      </div>
      <div className='game-result'>
        <div className='player-name'>{player2.username}</div>
        <div className='score-value'>{player2.timeUsed}</div>
      </div>
      <hr />
      <div className='show-winner'>
        <div>
          {winnerName(player1, player2) === null && (
            <div style={{ fontSize: '36px' }}>Draw</div>
          )}
          {winnerName(player1, player2) !== null && (
            <div>
              <div style={{ fontSize: '24px' }}>Winner</div>
              <div style={{ fontSize: '36px' }}>
                {winnerName(player1, player2)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
