import { CHANGELOADING } from '../const'

const initState = {
  loading: false
}
export const loadingReducer = (state = initState, actions) => {
  const { type, payload } = actions
  switch (type) {
    case CHANGELOADING:
      return {
        ...state,
        loading: payload
      }
    default:
      return state
  }
}
