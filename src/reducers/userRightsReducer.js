import { GETUSERRIGHTS } from '../const'
export const userRightReducer = (
  state = {
    username: ''
  },
  actions
) => {
  const { type } = actions
  switch (type) {
    case GETUSERRIGHTS:
      return { ...state, ...actions.userInfo }
    default:
      return state
  }
}
