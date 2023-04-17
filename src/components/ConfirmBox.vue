<template>
  <div class="container">
    <Transition name="bounce">
      <div class="confirm-container">
        <p class="confirm-title">Are u sure you want to log out?</p>
        <div class="confirm">
          <button @click="logout">Yes</button>
          <button>No</button>
        </div>
      </div>
    </Transition>
  </div>
</template>
<script>
import VueCookies from "vue-cookie";
import router from "../router";

export default {
  name: "confirm-box",
  setup() {
    function logout() {
      VueCookies.set("token", null, { expires: -1, path: "/" });
      router.push("/");
      setTimeout(() => {
        router.go(0);
      }, 500);
    }
    return { logout };
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  display: flex;
  justify-content: center;
}
.confirm-container {
  position: absolute;
  margin: auto;
  padding: auto;
  background-color: rgb(40, 211, 131);
  top: 30%;
  width: 25%;
  height: 20%;
  border: 2px solid black;
  border-radius: 2rem;
}
.confirm-title {
  color: white;
  font-size: x-large;
}
button {
  font-size: large;
  width: 5rem;
  height: 3rem;
  border-radius: 2rem;
  background-color: aliceblue;
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
