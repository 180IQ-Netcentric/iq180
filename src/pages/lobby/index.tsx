import React, { useContext, useState } from 'react'
import { Button, Switch } from '@mui/material'
import GameToggleButton from '../../components/buttons/GameToggleButton'
import GameContainer from '../../components/containers/GameContainer'
import PlayerInfoCard from '../../components/cards/PlayerInfoCard'
import { UserContext } from '../../contexts/userContext'
import { useHistory } from 'react-router'

const Lobby = () => {
  const DIGITS_COUNT_OPTION = [2, 3, 4, 5]
  const [selectedDigitsCount, setSelectedDigitsCount] = useState(5)
  const ROUNDS_COUNT_OPTION = [1, 3, 5, 7]
  const [selectedRoundsCount, setSelectedRoundsCount] = useState(3)
  const TIME_LMIT_OPTION = ['30 s', '60 s', '90 s', '120 s']
  const [timeLimit, setTimeLimit] = useState('60 s')
  const [isClassic, setClassic] = useState(true)
  const { user } = useContext(UserContext)
  const history = useHistory()

  return (
    <GameContainer>
      <div className='game-padding'>
        <div className='settings-header'>
          <h1>Match Settings</h1>
          <Button onClick={() => history.push('/')}>Leave Lobby</Button>
        </div>
        <hr />
        <div className='match-container'>
          <div className='match-settings'>
            <h3>Number of Digits</h3>
            <div>
              <div className='settings-toggle-item'>
                {DIGITS_COUNT_OPTION.map((digit) => (
                  <GameToggleButton
                    key={digit}
                    item={digit}
                    matcher={selectedDigitsCount}
                    toggleCallback={(num) => {
                      setSelectedDigitsCount(num)
                    }}
                  >
                    {digit}
                  </GameToggleButton>
                ))}
              </div>

              <h3>Number of Round</h3>
              <div className='settings-toggle-item'>
                {ROUNDS_COUNT_OPTION.map((round) => (
                  <GameToggleButton
                    key={round}
                    item={round}
                    matcher={selectedRoundsCount}
                    toggleCallback={(num) => {
                      setSelectedRoundsCount(num)
                    }}
                  >
                    {round}
                  </GameToggleButton>
                ))}
              </div>

              <h3>Time limit</h3>
              <div className='settings-toggle-item'>
                {TIME_LMIT_OPTION.map((limit) => (
                  <GameToggleButton
                    key={limit}
                    item={limit}
                    matcher={timeLimit}
                    toggleCallback={(time) => {
                      setTimeLimit(time)
                    }}
                  >
                    {limit}
                  </GameToggleButton>
                ))}
              </div>
              <div className='empty-space' />
              <div className='settings-item'>
                <span>VS Mode</span>
                <Switch
                  checked={!isClassic}
                  onChange={() => setClassic(!isClassic)}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </div>
              <div className='settings-item'>
                <span>Classic</span>
                <Switch
                  checked={isClassic}
                  onChange={() => setClassic(!isClassic)}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </div>
            </div>
          </div>
          <div className='player-info-container'>
            <div className='player-info'>
              {user && <PlayerInfoCard player={user} />}
            </div>
            <div className='player-info'>
              {user && <PlayerInfoCard player={user} />}
            </div>
            <Button
              variant='contained'
              size='large'
              sx={{ borderRadius: '15px' }}
              className='game-start-button game-start-button-match'
            >
              Start!
            </Button>
          </div>
        </div>
      </div>
    </GameContainer>
  )
}

export default Lobby
