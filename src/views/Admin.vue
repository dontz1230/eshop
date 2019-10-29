<template>
    <div class="admin">
        <div class="page-wrapper default-theme sidebar-bg bg1 toggled">
            <a @click="toggleMenu" href="#" id="show-sidebar" class="btn btn-sm btn-dark">
                <i class="fas fa-bars"></i>
            </a>
         <nav id="sidebar" class="sidebar-wrapper">
            <div class="sidebar-content">
                <!-- sidebar-brand  -->
                <div class="sidebar-item sidebar-brand">
                    <a href="#">pro sidebar</a>
                    <span style="color:white" @click="toggleMenu"><i class="fas fa-times"></i></span>
                </div>
                <!-- sidebar-header  -->
                <div class="sidebar-item sidebar-header d-flex flex-nowrap">
                    <div class="user-pic">
                        <img class="img-responsive img-rounded" src="img/user.jpg" alt="User picture">
                    </div>
                    <div class="user-info">
                        <span class="user-name">Jhon
                            <strong>Smith</strong>
                        </span>
                        <span class="user-role">{{email}}</span>
                        <span class="user-status">
                            <i class="fa fa-circle"></i>
                            <span>Online</span>
                        </span>
                    </div>
                </div>
                <!-- sidebar-search  -->
                <div class="sidebar-item sidebar-search">
                    <div>
                        <div class="input-group">
                            <input type="text" class="form-control search-menu" placeholder="Search...">
                            <div class="input-group-append">
                                <span class="input-group-text">
                                    <i class="fa fa-search" aria-hidden="true"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- sidebar-menu  -->
                <div class=" sidebar-item sidebar-menu">
                    <ul>
                        <li class="header-menu">
                            <span>Menu</span>
                        </li>
                        <li>
                            <router-link to="/admin/overview">
                                <i class="fa fa-tachometer-alt"></i>
                                <span class="menu-text">總覽</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/admin/products">
                                <i class="fa fa-book"></i>
                                <span class="menu-text">產品</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/admin/orders">
                                <i class="fa fa-calendar"></i>
                                <span class="menu-text">訂單</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/admin/profile">
                                <i class="fa fa-user"></i>
                                <span class="menu-text">個人檔案</span>
                            </router-link>
                        </li>
                        <li>
                            <a href="#" @click="logout">
                                <i class="fa fa-folder"></i>
                                <span class="menu-text">登出</span>
                            </a>
                        </li>
                    </ul>
                </div>
                
            </div>
           
            
        </nav>
        <!-- page-content  -->
        <main class="page-content pt-2">
           <router-view></router-view>
               
        </main>
        <!-- page-content" -->
    </div>
    </div>
</template>

<script>
import Hero from "../components/Hero.vue"
import { fb } from '../firebase.js'
export default {
    name: "admin",
    data(){
        return {
            name: null,
            email: null,
        }
    },
    components:{
        Hero
    },
    methods:{
        toggleMenu(){
            $(".page-wrapper").toggleClass('toggled')
        },
        logout(){
            fb.auth().signOut()
            .then( ()=> {
                this.$router.replace('/')
            })
            .catch( (err) => console.log(err))
        }
    },
    created(){
      var user = fb.auth().currentUser;
      this.email = user.email;
      console.log(this.name)
  }
}
</script>