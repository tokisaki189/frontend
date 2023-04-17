<template>
  <div class="container">
    <form class="login-form" @submit.prevent>
      <p>Login</p>
      <input
        type="text"
        name=""
        id="username"
        v-model="username"
        placeholder="Your username"
      />
      <input
        type="password"
        name=""
        id="password"
        v-model="password"
        placeholder="Your password"
        autoComplete="true"
      />
      <button class="login-button" @click.prevent="login">Login</button>
    </form>
    <div>{{ notification }}</div>
    <div class="link-wrap">
      <router-link to="/Register"
        >Don't have an account ? Register here
      </router-link>
      <router-link to="/forget"> Forgot password </router-link>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import api from "../api";
import VueCookies from "vue-cookie";
import { useStore } from "vuex";
import router from "../router";

export default {
  setup() {
    let store = useStore();
    let isLogin = ref(store.state.isLogin);
    let username = ref("");
    let password = ref("");
    let notification = ref("");
    let token = ref("");
    function checkcookie() {
      console.log(VueCookies.get("token"));
    }
    function login() {
      api
        .post("/api/login", {
          username: username.value,
          password: password.value,
        })
        .then((response) => {
          this.notification = response.data.notification;
          this.token = response.data.token;
          this.isLogin = response.data.isLogin;
          // const expirationTime = 10; // in milliseconds
          // const now = new Date();

          // // Check if the cookie already exists and get the timestamp
          // const existingTimestamp = VueCookies.get("my-cookie-timestamp");
          // const currentTimestamp = now.getTime();

          // if (existingTimestamp != null) {
          //   // Calculate the elapsed time since the cookie was last set
          //   const elapsedTime = currentTimestamp - existingTimestamp;

          //   if (elapsedTime >= expirationTime) {
          //     // The cookie has expired, remove it
          //     VueCookies.remove("token");
          //     VueCookies.remove("my-cookie-timestamp");
          //   }
          // }
          VueCookies.set("token", this.token);
          if (response.data.isLogin) {
            router.push("/");
            setTimeout(() => {
              router.go(0);
            }, 1000);
          } else {
            console.log("nothing");
          }
          console.log(isLogin.value);
        })

        .catch((error) => {
          console.log(error);
        });
    }
    return {
      username,
      password,
      login,
      notification,
      token,
      isLogin,
      checkcookie,
    };
  },
};
</script>
<style scoped>
body {
}
.container {
  width: 30rem;
  background-color: white;
  border: 1px black solid;
  margin: auto;
  padding: auto;
  margin-top: 5rem;
  border-radius: 1rem;
  padding-bottom: 3rem;
}
.login-form {
  margin: auto;
  padding: auto;
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  background-color: rgb(255, 255, 255);
}
textarea:focus,
input:focus {
  outline: none;
}
.login-form input {
  height: 2rem;
  border-top: none;
  border-right: none;
  border-left: none;
}
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
  width: 5rem;
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
.link-wrap {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
