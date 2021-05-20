<template>
    <div class="login-form">
      <UsernamePasswordLogin />
      <v-divider vertical color="#34656d" ></v-divider>
      <QrLogin />
    </div>    
</template>

<script>
import UsernamePasswordLogin from './UsernamePasswordLogin'
import QrLogin from './QrLogin'

export default {
    name: "login",
    components: {
        UsernamePasswordLogin,
        QrLogin
    }
}
</script>

<style lang="css" scoped>
    .login-form {
        display: flex;
        flex-direction: row; 
    }
</style>