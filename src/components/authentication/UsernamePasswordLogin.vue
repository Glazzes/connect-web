<template>
    <div class="form">
        <div class="username-password-login">
        <legend class="title">Welcome again!!!</legend>
        <v-form>
            <v-text-field label="Username" v-model="UsernamePasswordLoginRequest.username" solo />
            <v-text-field label="Password" v-model="UsernamePasswordLoginRequest.password" solo color="pink" />
            <v-btn color="#34656d" plain outlined block class="login-button">Log me in</v-btn>
            <span class="account-question">Don't you have an account?</span>
            <a class="signup-link" href="https://www.google.com">Sing up here</a>
        </v-form>
        </div>
    </div>
</template>

<script>
import platform from 'platform';

export default {
    name: "FormLogin",
    data() {
        return {
            UsernamePasswordLoginRequest: {
                username: "",
                password: "",
                remember: false,
                deviceInfo: {
                    type: "PC",
                    deviceName: platform.name,
                    deviceVersion: platform.version,
                    deviceOperatingSystem: platform.os.family
                }
            }
        }
    },
}
</script>

<style lang="css" scoped>
    @import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@500&display=swap');


    .form {
    display: flex;
    align-items: center;
    }

  .username-password-login {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 20px;
  }

  .title {
    font-size: 30px;
    margin-bottom: 20px;
    color: #34656d;
  }

  .login-button {
    margin-bottom: 20px;
  }

  .account-question {
    font-size: 14px;
    margin-right: 10px;
  }

  .signup-link {
    font-size: 14px;
    color: #34656d;
    text-decoration-line: none;;
  }
</style>
