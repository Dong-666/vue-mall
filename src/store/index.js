import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList: []
  },
  //   一、mutation方法
  // mutations: {
  //   addCart(context, payload) {
  //     let oldProduct = null
  //     for (let item of context.state.cartList) {
  //       if (item.iid === payload.iid) {
  //         oldProduct = item
  //       }
  //     }
  //     if (oldProduct) {
  //       oldProduct.count += 1
  //     }else {
  //       payload.count = 1
  //       context.state.cartList.push(payload)
  //     }
  //   }
  // },

  // 二、actions
  // mutations: {
  //   addCounter(state,payload) {
  //     payload.count += 1
  //   },
  //   addToCart(state,payload) {
  //     state.cartList.push(payload)
  //   }
  // },
  // actions: {
  //   addCart(context, payload) {
  //     let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

  //     if (oldProduct) {
  //       context.commit('addCounter', oldProduct)
  //     } else {
  //       payload.count = 1
  //       context.commit('addToCart', payload)
  //     }
  //   }
  // },

  //封装
  getters,
  mutations,
  actions,


  modules: {

  }
})