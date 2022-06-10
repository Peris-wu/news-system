import ajax from '../utils/ajax'
import { GETUSERRIGHTS, SETUSERRIGHTS } from '../const'
import handlerStorage from '../utils/handlerLocalStorage'
export function getUserRights(userInfo) {
  return async dispatch => {
    let { data } = await ajax.get(`/api/users/?username=${userInfo.username}&password=${userInfo.password}&roleState=true&_expand=role`)
    console.log(data)
    dispatch({ type: GETUSERRIGHTS, userInfo: data[0] })
    handlerStorage.setStorage(data[0])
    return data
  }
}
export function setUserRights(userInfo) {
  return {
    type: SETUSERRIGHTS,
    payload: userInfo
  }
}
