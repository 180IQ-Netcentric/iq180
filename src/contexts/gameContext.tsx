import React, { createContext, useState } from 'react'

export interface Settings {
  digit: number
  round: number
  timeLimit: number
  isClassicMode: boolean
}

export interface PlayerInfos {
  username: string
  win: number
  lose: number
  score: number
}

export interface PlayerGameInfo {
  username: string
  score: number
  timeUsed: number
}

export interface Question {
  number: number[]
  operator: string[]
  result: number
}

export interface GameInfo {
  setting: Settings
  player1: PlayerGameInfo
  player2: PlayerGameInfo
  firstPlayer: string
  currentRound: number
  questions: Question[]
}

export interface NextTurn {
  username: string
  timeUsed: number
}

export interface EndRound {
  username: string
  timeUsed: number
}

export interface SocketConstruct {
  socketOpen: boolean
  setSocketOpen: (value: boolean) => void
  settings: Settings | undefined
  setSettings: (value: Settings) => void
  playerInfos: PlayerInfos | undefined
  setPlayerInfos: (value: PlayerInfos) => void
  gameInfo: GameInfo | undefined
  setGameInfo: (value: GameInfo) => void
  winnerUsername: string | undefined
  setWinnerUsername: (value: string) => void
}

export const SocketContext = createContext({} as SocketConstruct)

const SocketContextProvider = ({ ...props }) => {
  const [socketOpen, setSocketOpen] = useState<boolean>(false)
  const [settings, setSettings] = useState<Settings>()
  const [playerInfos, setPlayerInfos] = useState<PlayerInfos>()
  const [gameInfo, setGameInfo] = useState<GameInfo>()
  const [winnerUsername, setWinnerUsername] = useState<string>()

  const value = {
    socketOpen,
    setSocketOpen,
    settings,
    setSettings,
    playerInfos,
    setPlayerInfos,
    gameInfo,
    setGameInfo,
    winnerUsername,
    setWinnerUsername,
  }
  return <SocketContext.Provider value={value} {...props} />
}

export default SocketContextProvider
