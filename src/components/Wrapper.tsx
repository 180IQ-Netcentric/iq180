import React, { useContext, useEffect } from 'react'
import { GameSettingsContext } from '../contexts/gameSettingsContext'
import { Theme, ThemeContext } from '../contexts/themeContext'

const Wrapper = ({ children }: any) => {
  const {
    toggleMusic,
    toggleSoundEffect,
    toggleMusicTrack,
    toggleBackground,
    toggleLanguage,
  } = useContext(GameSettingsContext)
  const { setAppTheme } = useContext(ThemeContext)

  useEffect(() => {
    // save default values to localstorage if they are not available
    if (!window.localStorage.getItem('musicOn')) {
      window.localStorage.setItem('musicOn', 'true')
      toggleMusic(true)
    }
    if (!window.localStorage.getItem('soundEffectOn')) {
      window.localStorage.setItem('soundEffectOn', 'false')
      toggleSoundEffect(false)
    }
    if (!window.localStorage.getItem('musicTrack')) {
      window.localStorage.setItem('musicTrack', '1')
      toggleMusicTrack(1)
    }
    if (!window.localStorage.getItem('background')) {
      window.localStorage.setItem('background', '0')
      toggleBackground(0)
    }
    if (!window.localStorage.getItem('language')) {
      window.localStorage.setItem('language', '0')
      toggleLanguage('en')
    }
    if (!window.localStorage.getItem('isDarkTheme')) {
      window.localStorage.setItem('isDarkTheme', 'false')
      setAppTheme(Theme.LIGHT)
    }

    document.body.classList.add(
      `page-background-${window.localStorage.getItem('background')}`
    )
  }, [])

  return <>{children}</>
}

export default Wrapper
