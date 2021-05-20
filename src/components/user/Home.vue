<template>
  <div>
    <v-avatar rounded :size="200">
      <v-img
          :src="profilePicture"
          :max-width="250"
          :max-height="250"
      >
      </v-img>
    </v-avatar>
    <div>
      <span class="hello-message">
        It's good to see you again!
        <span class="username">{{username}}</span>
      </span>
    </div>
  </div>
</template>

<script>
import store from '../../store';
import axios from 'axios';

export default {
  name: "User-Home",
  beforeRouteEnter(to, from, next){
    if(store.state.isAuthenticated) next()
  },
  computed: {
    username(){
      return this.$store.getters.nickname;
    },
    profilePicture() {
      return this.$store.getters.profilePicture;
    }
  },
  mounted() {
    this.getLoggedInUser();
  },
  methods: {
    getLoggedInUser(){
      axios.get("http://localhost:8082/auth/me", {withCredentials: true})
        .then(({data}) => {
          this.$store.dispatch("setLoggedUser", {user: data});
          console.log(data);
        })
        .catch(() => console.log("Hello world"))
    }
  }
}
</script>

<style scoped>
.hello-message {
  font-size: 16px;
  margin-bottom: 5px;
}

.username {
  font-size: 16px;
  color: #34656d;
}
</style>