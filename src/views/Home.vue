<template>
  <div class="home">
    <my-nav/>
    
    <product-list></product-list>
    <cart-view></cart-view>

    
    
  </div>
</template>

<script>
import cartView from '../components/CartView.vue'
export default {
  name: 'home',
  components: {
    cartView
  }
}
</script>
