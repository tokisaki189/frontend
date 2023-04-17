/* eslint-disable */
<template>
  <div class="top-bar">
    <nav class="nav-bar">
      <router-link to="/">Home <font-awesome-icon icon="home" /></router-link>
      <router-link to="/about">About</router-link>
      <!-- <router-link to="/booking">
        Find Flight
        <font-awesome-icon icon="search" />
      </router-link> -->
    </nav>
    <nav class="user-section">
      <router-link to="/history" v-if="isLogin"
        ><font-awesome-icon icon="shopping-cart" />
      </router-link>
      <router-link to="/Login" v-if="!isLogin">Login</router-link>
      <router-link to="/Register" v-if="!isLogin">Register </router-link>
      <router-link to="/user" v-if="isLogin">
        Profile
        <font-awesome-icon icon="user" />
      </router-link>
      <router-link to="/admin" v-if="isLogin && isAdmin"
        >Admin Panel</router-link
      >
      <a @click="logout" v-if="isLogin">
        <font-awesome-icon :icon="['fa', 'right-from-bracket']" />
      </a>
    </nav>
  </div>
  <keep-alive>
    <router-view />
  </keep-alive>
  <!-- <button type="submit" @click="changestate">change</button> -->
  <confirm-box v-if="showConfirm"></confirm-box>
  <footer-section></footer-section>
</template>
<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import VueCookies from "vue-cookie";
import router from "./router";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faRightFromBracket,
  faSearch,
  faRightToBracket,
  faUser,
  faHome,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import ConfirmBox from "./components/ConfirmBox.vue";
import FooterSection from "./components/FooterSection.vue";
import jwtDecode from "jwt-decode";
import api from "./api.js";
import Cookies from "js-cookie";

export default {
  components: { FontAwesomeIcon, ConfirmBox, FooterSection },
  setup() {
    let store = useStore();
    let isLogin = ref();
    let showConfirm = ref(false);
    let user = ref("");
    let userId = ref();
    let userInfo = ref("");
    let isAdmin = ref();
    library.add(
      faRightFromBracket,
      faShoppingCart,
      faSearch,
      faRightToBracket,
      faUser,
      faHome
    );
    onMounted(() => {
      // console.log(this.token.value);
      api
        .get("/check", { withCredentials: true })
        .then((response) => {
          if (response.data.isLogin === true) {
            store.commit("login");
            isLogin.value = store.state.isLogin;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
    const token = Cookies.get("token");
    if (token) {
      user.value = jwtDecode(token);
      userId.value = user.value.id;
      api
        .get("/userprofile/" + userId.value, {})
        .then((response) => {
          userInfo.value = response.data;
          store.commit("setID", userInfo.value[0].id);
          store.commit("setAdmin", userInfo.value[0].isAdmin);
          isAdmin.value = store.state.isAdmin;
        })
        .catch((error) => {
          console.log(error);
        });
    }
    function logout() {
      let text = "Are you sure";
      if (confirm(text) == true) {
        VueCookies.set("token", null, { expires: -1, path: "/" });
        router.push("/");
        setTimeout(() => {
          router.go(0);
        }, 500);
      } else {
        console.log("cancelled");
      }
    }
    return {
      isLogin,
      confirm,
      showConfirm,
      user,
      userId,
      userInfo,
      isAdmin,
      logout,
    };
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  background-color: #d9eafc;
}
* {
  margin: 0;
  padding: 0;
}
.top-bar {
  position: fixed;
  top: 0;
  padding-left: 2rem;
  width: 100%;
  height: 3.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* background-image: linear-gradient(to top, rgba(255, 0, 0, 0), rgb(0, 0, 0)); */
  background-color: #2c3e50;
  align-items: center;
}
.user-section {
  font-size: x-large;
  display: flex;
  /* gap: 0.5rem; */
  margin-right: 4rem;
  height: 100%;
}
.user-section a {
  font-size: x-large;
  font-weight: bold;
  color: #fafcff;
  text-decoration: none;
  /* border-radius: 0.5rem; */
  /* padding: 0.2rem; */
}
.user-section *:hover {
  /* color: rgb(255, 0, 0); */
  background-color: #1cb0f6;
}
.nav-bar {
  display: flex;
  /* gap: 0.5em; */
  font-size: x-large;
  height: 100%;
}
.nav-bar *:hover {
  /* color: rgb(208, 255, 0); */
  background-color: #1cb0f6;
}
nav a {
  font-size: x-large;
  font-weight: bold;
  color: #ffffff;
  /* background-color: red; */
  text-decoration: none;
  padding: 0.2rem;
  /* height: 100%; */
}

nav a.router-link-exact-active {
  /* color: #5e5e5e; */
  background-color: #1cb0f6;
  /* height: 100%; */
}
</style>
