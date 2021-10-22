import React, { useContext, useEffect } from 'react'
import { useLocation } from 'react-router'
import socketIOClient from 'socket.io-client'
import {
  GameInfo,
  PlayerInfos,
  Settings,
  SocketContext,
} from '../contexts/socketContext'
import { UserContext } from '../contexts/userContext'

const Socket = ({ children }: any) => {
  const {
    socketOpen,
    setSettings,
    setPlayerInfos,
    setGameInfo,
    setWinnerUsername,
  } = useContext(SocketContext)
  const location = useLocation()
  const inSocketPages = () => {
    return (
      window.location.pathname === '/lobby' ||
      window.location.pathname === '/game'
    )
  }

  const { socket, setSocket } = useContext(SocketContext)
  const { user } = useContext(UserContext)

  useEffect(() => {
    if (!inSocketPages()) {
      socket?.emit('disconnectUser', user)
      if (socket) socket.disconnect()
      setSocket(undefined)
    }

    if (!socketOpen || !inSocketPages()) return
    if (!socket) {
      const newSocket = socketIOClient(
        `${import.meta.env.VITE_APP_API_URL}` ?? 'http://localhost:3001'
      )
      setSocket(newSocket)
    }
    if (!socket) return

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
  }, [socketOpen, location])

  return <>{children}</>
}

export default Socket
