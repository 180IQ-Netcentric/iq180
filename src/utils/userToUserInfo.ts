import { User, UserInfo } from '../dto/Authentication.dto'

export const userToUserInfo = (user: User | UserInfo) => {
  return {
    username: user.username,
    win: user.win,
    lose: user.lose,
    score: user.score,
  }
}
