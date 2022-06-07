import { CHANGECOLLAPSED } from '../const/index'
export function getCollapsed(paylod) {
  return {
    type: CHANGECOLLAPSED,
    paylod
  }
}
