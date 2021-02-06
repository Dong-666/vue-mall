const mutations = {
  addCounter(state,payload) {
    payload.count += 1
  },
  addToCart(state,payload) {
    payload.checked = true
    state.cartList.push(payload)
  }
}

export default mutations