import React, { useContext } from 'react'
import GameToggleButton from '../../components/buttons/GameToggleButton'
import RoundedSecondaryButton from '../../components/common/RoundedSecondaryButton'
import RoundedTextField from '../../components/common/RoundedTextField'
import { GameSettingsContext } from '../../contexts/gameSettingsContext'
import { Theme, ThemeContext } from '../../contexts/themeContext'
import { IconButton, Switch } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { musicTrackNames } from '../../dto/SoundTrack'

const GameSettings = ({ onClose }: any) => {
  const {
    musicOn,
    toggleMusic,
    soundEffectOn,
    toggleSoundEffect,
    musicTrack,
    toggleMusicTrack,
    background: appBackground,
    toggleBackground,
    language: appLanguage,
    toggleLanguage,
  } = useContext(GameSettingsContext)
  const { theme, setAppTheme } = useContext(ThemeContext)

  const musicTracks = [0, 1, 2, 3, 4]
  const backgrounds = [0, 1, 2, 3, 4]
  const languages = ['en', 'th']

  const changeBackground = (value: number) => {
    document.body.classList.forEach((className) => {
      if (className.startsWith('page-background-')) {
        document.body.classList.remove(className)
      }
    })
    document.body.classList.add(`page-background-${value}`)
  }

  return (
    <div className='home-content-container settings-container'>
      <div className='settings-header'>
        <h1>Game Settings</h1>
        <IconButton
          size='large'
          edge='end'
          color='inherit'
          aria-label='menu'
          sx={{ height: '48px', width: '48px', alignSelf: 'center' }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </div>
      <hr />
      <h2>Username</h2>
      <div>
        <RoundedTextField
          required
          id='outlined-required'
          label='Required'
          defaultValue='the username'
          sx={{ width: '100%', maxWidth: '300px', margin: '0 15px 15px 0' }}
        />
        <RoundedSecondaryButton
          onClick={() => {
            console.log('save username')
          }}
        >
          Save
        </RoundedSecondaryButton>
      </div>
      <hr />
      <h2>Audio</h2>
      <div className='settings-item'>
        <span>Music</span>
        <Switch
          checked={musicOn}
          onChange={() => toggleMusic(!musicOn)}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </div>
      <div className='settings-item'>
        <h4>Sound Effects</h4>
        <Switch
          checked={soundEffectOn}
          onChange={() => toggleSoundEffect(!soundEffectOn)}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </div>
      <div>
        <h4>Music Tracks</h4>
        <div className='settings-toggle-item'>
          {musicTracks.map((track) => (
            <GameToggleButton
              key={track}
              item={track}
              matcher={musicTrack}
              toggleCallback={(track) => toggleMusicTrack(track)}
            >
              <p style={{ fontSize: '10px' }}>{musicTrackNames[track]}</p>
            </GameToggleButton>
          ))}
        </div>
      </div>
      <h2>Background</h2>
      <div>
        <div className='settings-toggle-item'>
          {backgrounds.map((background) => (
            <GameToggleButton
              key={background}
              item={background}
              matcher={appBackground}
              toggleCallback={(background) => {
                toggleBackground(background)
                changeBackground(background)
              }}
            >
              {background + 1}
            </GameToggleButton>
          ))}
        </div>
        <div className='settings-item'>
          <h4>Dark Mode</h4>
          <Switch
            checked={theme === Theme.DARK}
            onChange={() =>
              setAppTheme(theme === Theme.DARK ? Theme.LIGHT : Theme.DARK)
            }
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </div>
      </div>
      <hr />
      <div>
        <h4>Langauge</h4>
        <div className='settings-toggle-language'>
          {languages.map((language) => (
            <div key={language} style={{ marginRight: '20px' }}>
              <GameToggleButton
                item={language}
                matcher={appLanguage}
                toggleCallback={(language) => toggleLanguage(language)}
              >
                {language}
              </GameToggleButton>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default GameSettings
