<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">田園美食屋</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <router-link to="/home" class="nav-link" href="#">首頁</router-link >
      </li>
      <li class="nav-item">
        <router-link to="/about" class="nav-link" href="#">關於</router-link>
      </li>
      
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <a class="btn btn-outline-success my-2 my-sm-0" data-target="#login">Login</a>
      <a @click="showCart" class="btn btn-outline-info my-2 my-sm-0" data-target="#cartWindow">CART</a>
      <login></login>
    </form>
  </div>
</nav>
  </div>
</template>

<script>
import Login from '../components/Login.vue'
export default {
  name: 'Navbar',
  components: {
    Login
  },
  methods:{
    showCart(){
      $('#cartWindow').modal('show')
    }
  }
}
</script>

<style scoped lang="scss">

</style>
