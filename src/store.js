import Vue from 'vue'
import Vuex from 'vuex'
 
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart:[]
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
    }
  },
  actions: {

  }
})
