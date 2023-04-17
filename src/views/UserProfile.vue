<template>
  <div class="container">
    <div class="user-profile"></div>
    <form v-if="userInfo" class="user-info">
      <p>Username:</p>
      <input v-model="userInfo[0].username" />
      <p>First Name</p>
      <input v-model="userInfo[0].first_name" />
      <p>Last Name</p>
      <input v-model="userInfo[0].last_name" />
      <p>Email</p>
      <input v-model="userInfo[0].email" />
      <p>Password</p>
      <input v-model="userInfo[0].password" />
      <button @click="updateProfile()">Update information</button>
      <div class="errorBox">
        <p v-for="msg in message" :key="msg" class="error">∘ {{ msg }}</p>
      </div>
    </form>
    <div v-else>loading</div>
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import api from "../api.js";
export default {
  setup() {
    let isLogin = ref();
    let store = useStore();
    let user = ref("");
    let userId = ref();
    let userInfo = ref("");
    let message = ref("");
    onMounted(() => {
      userId.value = store.state.userID;
      api
        .get("/userprofile/" + userId.value, {})
        .then((response) => {
          userInfo.value = response.data;
          console.log(userInfo.value);
        })
        .catch((error) => {
          console.log(error);
        });
    });
    function updateProfile() {
      let text = "Are you sure";
      if (confirm(text) == true) {
        location.reload();
        api
          .put("/updateProfile/" + userId.value, {
            username: userInfo.value[0].username,
            firstname: userInfo.value[0].first_name,
            lastname: userInfo.value[0].last_name,
            email: userInfo.value[0].email,
            password: userInfo.value[0].password,
          })
          .then((response) => {
            console.log(response.data);
            this.message = response.data.message;
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log("cancelled");
      }
    }
    return {
      isLogin,
      user,
      userId,
      userInfo,
      updateProfile,
      message,
    };
  },
};
</script>
<style scoped>
.container {
  margin: auto;
  padding: auto;
  margin-top: 5rem;
  margin-left: 4rem;
  gap: 2rem;
  display: flex;
  flex-direction: row;
}
.user-profile {
  width: 15rem;
  height: 15rem;
  border: 1px rgb(0, 0, 0) solid;
  border-radius: 20rem;
  background-color: rgb(255, 255, 255);
  background-size: contain;
  background-image: url("../assets/image/pfp.png");
}
.user-info {
  display: flex;
  flex-direction: column;
  width: 60%;
  height: 50rem;
  padding-top: 4rem;
  border: 1px rgb(0, 0, 0) solid;
  border-radius: 2rem;
  background-color: white;
}
input {
  width: 50%;
  margin: 1rem;
  height: 3rem;
  border-top: none;
  border-left: none;
  border-right: none;
  padding-left: 1rem;
  background: none;
  font-size: larger;
}
p {
  align-self: flex-start;
  justify-self: flex-start;
  margin-left: 2rem;
}

/* CSS */
button {
  appearance: button;
  background-color: #1899d6;
  border: solid transparent;
  border-radius: 16px;
  border-width: 0 0 4px;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-family: din-round, sans-serif;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.8px;
  line-height: 20px;
  margin: 0;
  margin-left: 1rem;
  outline: none;
  overflow: visible;
  padding: 13px 16px;
  text-align: center;
  text-transform: uppercase;
  touch-action: manipulation;
  transform: translateZ(0);
  transition: filter 0.2s;
  user-select: none;
  -webkit-user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  width: 15rem;
}

button:after {
  background-clip: padding-box;
  background-color: #1cb0f6;
  border: solid transparent;
  border-radius: 16px;
  border-width: 0 0 4px;
  bottom: -4px;
  content: "";
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: -1;
}

button:main,
.button-19:focus {
  user-select: auto;
}

button:hover:not(:disabled) {
  filter: brightness(1.1);
  -webkit-filter: brightness(1.1);
}

button:disabled {
  cursor: auto;
}
</style>
