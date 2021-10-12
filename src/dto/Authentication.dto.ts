export interface SignInInfo {
  username: string
  password: string
}

export interface SignUpResponse {
  isUser: boolean
  jwt: string
  lose: number
  score: number
  username: string
  win: number
}
