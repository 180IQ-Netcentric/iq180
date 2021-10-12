import React, { createContext, useState } from 'react'

export interface User {
  isUser: boolean
  jwt: string
  lose: number
  score: number
  username: string
  win: number
}

export interface UserConstruct {
  user: User | undefined
  setUser: (value: User) => void
  clearUser: () => void
}

export const UserContext = createContext({} as UserConstruct)

const UserContextProvider = ({ ...props }) => {
  const [user, setUser] = useState<User>()

  const clearUser = () => {
    setUser(undefined)
  }

  const value = { user, setUser, clearUser }
  return <UserContext.Provider value={value} {...props} />
}

export default UserContextProvider
