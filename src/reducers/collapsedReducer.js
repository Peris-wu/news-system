import { CHANGECOLLAPSED } from '../const'
const initCollapsed = {
  collapsed: false
}
export const collapsedReducer = (state = initCollapsed, actions) => {
  const { type, paylod } = actions
  switch (type) {
    case CHANGECOLLAPSED:
      return {
        ...state,
        collapsed: paylod
      }
    default:
      return state
  }
}
