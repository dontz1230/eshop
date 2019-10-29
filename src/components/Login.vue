<template>
  <div>
      <md-dialog-content>
          <md-dialog :md-active.sync="showDialog">
            <md-dialog-title>登入會員</md-dialog-title>

      <md-tabs md-dynamic-height>
          <md-tab md-label="LOGIN">
              <input v-model="loginEmail" type="email" placeholder="Email">
              <input v-model="loginPwd" type="password" placeholder="Passwrod">
              <button @click="login" @keyup.enter="login">登入</button>
          </md-tab>

          <md-tab md-label="SIGNUP">
            <input v-model="name" type="text" placeholder="Name">
              <input v-model="email" type="email" placeholder="Email">
              <input v-model="password" type="password" placeholder="Passwrod">
              <button @click="signUp" @keyup.enter="signUp">註冊</button>
          </md-tab>

            </md-tabs>

            <md-dialog-actions>
                <md-button class="md-primary" @click="showDialog = false">先不要</md-button>
            </md-dialog-actions>
    </md-dialog>

    <md-button class="md-primary md-raised" @click="showDialog = true">登入會員</md-button></md-dialog-content>
  </div>
</template>

<script>
import {fb,db} from '../firebase.js'
  export default {
    name: 'Login',
    data(){
      return {
        showDialog: false,
        email: '',
        password: '',
        loginEmail:'',
        loginPwd:'',
        name:''
      }
    },
    methods:{
      login(){
        fb.auth().signInWithEmailAndPassword(this.loginEmail, this.loginPwd)
        .then( (user) => {
          alert('登入成功')
          this.$router.replace('admin')
          this.showDialog = false
        }, (err) => {
          alert(err.message)
         } )
      },
      signUp(){
        fb.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then( (user) => {
          alert('成功創好帳號囉')
          this.showDialog = false

          //儲存註冊姓名this.name到profiles database
          db.collection('profiles').doc(user.user.uid).set({
            name: this.name
          }).then(() => {
            console.log('Signed up successfully')
          }).catch((error) => {
            console.log('this is' + error)
          })

          this.$router.replace('admin')
        }, (err) => {
          alert(err.message)
         } )}
    }
  }
</script>

<style lang="scss" scoped>
  .md-dialog {
    max-width: 768px;
  }
</style>