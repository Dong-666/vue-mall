const actions = {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      if (oldProduct) {
        context.commit('addCounter', oldProduct)
        resolve('商品数量+1')
      } else {
        payload.count = 1
        context.commit('addToCart', payload)
        resolve('成功添加商品')
      }
    })
  }
}

export default actions