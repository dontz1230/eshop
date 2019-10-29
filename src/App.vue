<template>
  <div id="app">
    
    <router-view></router-view>
  </div>
</template>

<script>
import myNav from './components/Navbar.vue'
export default {
  components:{
    myNav
  }
}
</script>