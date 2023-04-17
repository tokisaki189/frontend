<template>
  <div class="container">
    <div>Type your email here so that we can find your account</div>
    <form><input type="email" name="" id="" v-model="email" /></form>
    <p>{{ message }}</p>
    <button type="submit" @click="findEmail()">Find My Account</button>
  </div>
</template>
<script>
import { ref } from "vue";
import api from "../api";
export default {
  setup() {
    let message = ref("");
    let email = ref("");
    function findEmail() {
      api
        .get("/findEmail/" + email.value)
        .then((response) => {
          console.log(response.data);
          message.value = response.data.message;
          console.log(message.value);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    return { email, findEmail, message };
  },
};
</script>
<style scoped>
.container {
  margin-top: 10rem;
}
input {
  height: 2rem;
  width: 30rem;
  border-radius: 2rem;
  padding-left: 1rem;
}
button {
  background-color: white;
  height: 2rem;
  border-radius: 2rem;
  margin-top: 1rem;
  width: 8rem;
}
</style>
