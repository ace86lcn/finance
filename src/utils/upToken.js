import store from '../store'

const upToken = {}

if (store.state.token) {
  upToken[store.state.tokenName] = store.state.token
}

export default upToken