import React, { useState, useEffect, useContext } from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import useSound from 'use-sound'
// import timeWarning from '../../../assets/audio/timeWarning.mp3'
import { GameSettingsContext } from '../../../contexts/gameSettingsContext'
import clickSfx from '../../../assets/audio/click.mp3'

type Props = {
  onComplete: (value: number) => void
}

const CountDownTimer = (props: Props) => {
  const { onComplete } = props
  const [play] = useSound(clickSfx)
  let canPlaySound = true
  const { soundEffectOn } = useContext(GameSettingsContext)

  useEffect(() => {
    play()
  }, [canPlaySound])
  return (
    <div className='countdown-timer'>
      <CountdownCircleTimer
        isPlaying
        duration={15}
        size={80}
        colors={[
          ['#004777', 0.33],
          ['#F7B801', 0.33],
          ['#A30000', 0.33],
        ]}
        onComplete={onComplete}

      >
        {({ remainingTime }) => {
          if (remainingTime === 10) {
            if (canPlaySound ) play()
            canPlaySound = false
          }
          return remainingTime
        }}
      </CountdownCircleTimer>
    </div>
  )
}

export default CountDownTimer
