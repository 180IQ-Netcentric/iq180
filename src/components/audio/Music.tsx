import React, { useContext, useEffect } from 'react'
import { GameSettingsContext } from '@/contexts/gameSettingsContext'
import { musicTracks } from '@/dto/SoundTrack'
import ReactAudioPlayer from 'react-audio-player'

type Props = {
  track: string
}

const Music = ({ track }: Props) => {
  const { musicOn, musicTrack } = useContext(GameSettingsContext)

  return (
    <>
      {musicOn && (
        <ReactAudioPlayer
          style={{ display: 'none' }}
          src={track ?? musicTracks[musicTrack]?.toString()}
          volume={0.2}
          autoPlay
          controls
          loop={true}
        />
      )}
    </>
  )
}

export default Music
