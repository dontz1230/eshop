import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let cart = window.localStorage.getItem('cart')

export default new Vuex.Store({
  state: {
    cart: cart ? JSON.parse(cart) : []
  },
  mutations: {
    addToCart(state, item){
      let bought = state.cart.find(product => 
        product.productName = item.productName
      )

      if(bought){
        bought.productAmount++
      } else {
        state.cart.push(item);
      }

      this.commit('saveData');
    },

    saveData(state){
      window.localStorage.setItem('cart', JSON.stringify(state.cart))
    }
  },
  actions: {

  }
})
