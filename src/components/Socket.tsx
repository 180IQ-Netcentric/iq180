import React, { useContext, useEffect } from 'react'
import socketIOClient from 'socket.io-client'
import {
  EndRound,
  GameInfo,
  NextTurn,
  PlayerInfos,
  Settings,
  SocketContext,
} from '../contexts/gameContext'
import { UserInfo } from '../dto/Authentication.dto'

const socket = socketIOClient(
  `${import.meta.env.VITE_APP_API_URL}` ?? 'http://localhost:3001'
)

export const joinRoom = (userInfo: UserInfo) => {
  socket.emit('joinRoom', userInfo)
}

export const updateSettings = (settings: Settings) => {
  socket.emit('updateSetting', settings)
}

export const startGame = () => {
  socket.emit('playerStartGame')
}

export const nextTurn = (nextTurnInfo: NextTurn) => {
  socket.emit('nextTurn', nextTurnInfo)
}

export const endRound = (endRoundInfo: EndRound) => {
  socket.emit('endRound', endRoundInfo)
}

export const nextRound = () => {
  socket.emit('nextRound')
}

export const disconnectSocket = (username: string) => {
  socket.emit('disconnect', username)
}

const Socket = ({ children }: any) => {
  const {
    socketOpen,
    setSettings,
    setPlayerInfos,
    setGameInfo,
    setWinnerUsername,
  } = useContext(SocketContext)

  useEffect(() => {
    if (!socketOpen) return

    socket.on('updatePlayerList', (playerInfos: PlayerInfos) => {
      setPlayerInfos(playerInfos)
    })

    socket.on('updateSetting', (settings: Settings) => {
      setSettings(settings)
    })

    socket.on('startRound', (gameInfo: GameInfo) => {
      setGameInfo(gameInfo)
      // If your username is firstPlayer then u start playing game
      // If not waiting na
      // Don’t care
    })

    socket.on('startNextTurn', () => {
      // If your username is not firstPlayer then u start playing game
      // If yes waiting na
    })

    socket.on('endGame', (gameInfo: GameInfo) => {
      setGameInfo(gameInfo)
    })

    socket.on('announceWinner', (username: string) => {
      setWinnerUsername(username)
    })

    socket.on('startRound', (gameInfo: GameInfo) => {
      setGameInfo(gameInfo)
      // If your username is firstPlayer then u start playing game
      // If not waiting na
      // Don’t care na
    })
  }, [socketOpen])

  return <>{children}</>
}

export default Socket
