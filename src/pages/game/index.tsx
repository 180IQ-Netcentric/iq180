import React from 'react'
import Scoreboard from '../../components/scoreboard/Scoreboard'
// import OperationButton from '../../components/buttons/OperationButton'
import GameContainer from '../../components/containers/GameContainer'
const Game = () => {
  return (
    <>
      <GameContainer>
        <div className='playerScore'>
          <h1>Player info</h1>
        </div>
        <div className='game-page-container'>
          <Scoreboard />
          <div className='scoreboard'>hi</div>
        </div>
      </GameContainer>
    </>
  )
}

export default Game
