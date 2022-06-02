import { GETUSERRIGHTS, SETUSERRIGHTS } from '../const'
export const userRightReducer = (state = {}, actions) => {
  const { type } = actions
  switch (type) {
    case GETUSERRIGHTS:
      return { ...state, ...actions.userInfo }
    case SETUSERRIGHTS:
      return { ...state, ...actions.payload }
    default:
      return state
  }
}
