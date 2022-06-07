import { CHANGELOADING } from '../const'
export function getLoading(payload) {
  return {
    type: CHANGELOADING,
    payload
  }
}
