<template>
  <div class="register-container">
    <form class="register-form">
      <p>Register an account</p>
      <input
        type="text"
        name=""
        id="fname"
        placeholder="Your first name"
        v-model="newFirstName"
      />
      <input
        type="text"
        name=""
        id="lname"
        placeholder="Your last name"
        v-model="newLastName"
      />
      <input
        type="text"
        name=""
        id="uname"
        placeholder="Your username"
        v-model="newUserName"
      />
      <input
        type="email"
        name=""
        id="email"
        placeholder="Your email"
        v-model="newEmail"
      />
      <input
        type="password"
        name="pass"
        id=""
        placeholder="Your password"
        v-model="newPassword"
        autocomplete="on"
      />
      <button class="register-button" @click.prevent="register()">
        Register
      </button>
    </form>
  </div>
  <div class="errorBox">
    <p v-for="msg in message" :key="msg" class="error">∘ {{ msg }}</p>
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
import api from "../api";
export default {
  setup() {
    let newEmail = ref("");
    let newUserName = ref("");
    let newPassword = ref("");
    let newFirstName = ref("");
    let newLastName = ref("");
    let responseData = ref("");
    let message = ref("");
    onMounted(() => {
      api
        .get("/showuser")
        .then((response) => {
          responseData.value = response.data;
          console.log(responseData.value);
        })
        .catch((error) => {
          console.error(error);
        });
    });

    function register() {
      console.log(
        newFirstName.value +
          "and" +
          newLastName.value +
          "and" +
          newUserName.value
      );
      api
        .post("/api/register", {
          username: newUserName.value,
          firstname: newFirstName.value,
          lastname: newLastName.value,
          password: newPassword.value,
          email: newEmail.value,
        })
        .then((response) => {
          console.log(response.data);
          this.message = response.data.message;
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return {
      newEmail,
      newUserName,
      newPassword,
      newFirstName,
      newLastName,
      register,
      responseData,
      message,
    };
  },
};
</script>
<style scoped>
.register-container {
  margin-top: 10rem;
}
.register-form {
  margin: auto;
  padding: auto;
  border-radius: 2rem;
  width: 30%;
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
.register-form input {
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
.errorBox {
  color: red;
  width: 22rem;
  margin: auto;
  padding: auto;
  display: flex;
  flex-direction: column;
  align-items: start;
}
</style>
