<template>
    <div v-if="!hasBeenScanned" class="qr-login">
      <VueQr :text="qr" :size="250" :margin="10" />
      <h3 class="qr-code-title">Login with QR code</h3>
      <span class="account-question">
        Scan this code with the Connect app ! 
        <v-icon color="#34656d" size="18">mdi-information-outline</v-icon>
      </span>
    </div>

    <div v-else class="qr-login">
      <div class="user-avatar">
        <v-badge
          color="#34656d"
          bordered
          bottom
          overlap
          offset-y="25"
          offset-x="30"
        >
          <v-avatar :size="128">
            <v-img :src="user.profilePicture" alt="User id"></v-img>
          </v-avatar>
        </v-badge>
      </div>
      <h2 class="cell-phone-title">Check your phone!</h2>
      <span class="loggin-in-info">Loggin in as 
        <span class="username">{{user.nickname}}</span>
      </span>
      <span class="wrong-user">
        This is not me 
        <a href="#" class="username" @click="reset">start over</a>
      </span>

      <v-snackbar v-model="snackbar" outlined :timeout="5000" color="#ce1212">
        You can not login without scanning the qr code
        <template v-slot:action="{attrs}">
          <v-btn text color="#ce1212" v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
</template>

<script>
import axios from 'axios';
import VueQr from 'vue-qr';
import {v4 as uuid} from 'uuid';
import platform from 'platform';

const browserId = uuid();

export default {
    name: "QrLogin",
    components: {VueQr},
    data() {
        return {
            snackbar: false,
            browserId: browserId,
            hasBeenScanned: false,
            user: {
                username: "",
                nickname: "",
                profilePicture: ""
            },
            qrLoginRequestObject: {
                issuedFor: "",
                mobileSignature: "",
                webSignature: browserId,
                deviceInfo: {
                    type: "PC",
                    deviceName: platform.name,
                    deviceVersion: platform.version,
                    deviceOperatingSystem: platform.os.family
                }
            }
        }
    },
    computed: {
        qr() {
            return JSON.stringify(this.qrLoginRequestObject)
        }
    },
    methods: {
      reset() {
        this.user = {
          username: "",
          nickname: "",
          profilePicture: ""
        }

        this.qrLoginRequestObject.mobileSignature = "";
        this.hasBeenScanned = false;
        this.snackbar = false;
      },
      performQrLogin() {
        axios.post("http://localhost:8082/auth/qr/login", this.qrLoginRequestObject, {withCredentials: true})
            .then(() => {
              console.log("Qr good")
              this.$store.dispatch("authenticate");
              this.$router.push({name: "User-Home"});
            })
            .catch(error => console.log(error));
      }
    },
    mounted() {
      const eventSource = new EventSource(`http://localhost:8082/auth/sse/${browserId}/listen`);

      eventSource.addEventListener('onQrScanned', (event) => {
        const qrEventData = JSON.parse(event.data);
        const {username, nickname, profilePicture} = qrEventData;
        this.user = {
          username,
          nickname,
          profilePicture
        }

        this.qrLoginRequestObject.issuedFor = qrEventData.username;
        this.qrLoginRequestObject.mobileSignature = qrEventData.mobileSignature;
        this.hasBeenScanned = true;
        console.log(JSON.stringify(this.qrLoginRequestObject));
      });

      eventSource.addEventListener("onQrLogin", this.performQrLogin);
      eventSource.addEventListener("onQrCancel", this.reset);
    }
}
</script>

<style lang="css" scoped>
    .qr-login {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 20px;
  }

  .user-avatar {
    margin-bottom: 20px;
  }

  .qr-code-title {
    color: #34656d;
  }

  .cell-phone-title {
    font-size: 30px;
    color: #34656d;
  }

  .loggin-in-info {
    font-size: 16px;
    margin-bottom: 5px;
  }

  .username {
    font-size: 16px;
    color: #34656d;
  }

  .wrong-user {
    margin-top: 20px;
    font-size: 15px;
  }
</style>
