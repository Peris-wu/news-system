const TOKEN = 'token'
const handler = {
  getStorage: () => {
    return JSON.parse(localStorage.getItem(TOKEN))
  },
  setStorage: value => {
    localStorage.setItem(TOKEN, JSON.stringify(value))
  },
  removeStorage: () => {
    localStorage.removeItem(TOKEN)
  }
}
export default handler
