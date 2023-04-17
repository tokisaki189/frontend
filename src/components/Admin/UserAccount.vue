<template>
  <div class="container">
    <form class="register-form">
      <p>Add a new</p>
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
      <label for="role"> Role</label>
      <select name="" id="role" v-model="role" required>
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>
      <button class="register-button" @click.prevent="addAccount()">
        Add Account
      </button>
    </form>
    <div class="errorBox">
      <p v-for="msg in message" :key="msg" class="error">∘ {{ msg }}</p>
    </div>
    <div>
      <table border="1" class="user-table">
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Password</th>
          <th>Date Joined</th>
          <th>Role</th>
          <th>Operation</th>
        </tr>
        <tr v-for="user in users" :key="user">
          <td>{{ user.id }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.first_name }}</td>
          <td>{{ user.last_name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.password }}</td>
          <td>{{ formatDate(user.date_joined) }}</td>
          <td>{{ getRole(user.isAdmin) }}</td>
          <td>
            <button class="deleteAcc" @click="deleteAccount(user.id)">
              Delete account
            </button>
            <button @click="changeRole(user.id)">Change Role</button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import { onMounted, ref } from "vue";
import api from "../../api";
export default {
  name: "UserAccount",
  setup() {
    let users = ref([]);
    let role = ref("user");
    let newEmail = ref("");
    let newUserName = ref("");
    let newPassword = ref("");
    let newFirstName = ref("");
    let newLastName = ref("");
    let dateJoined = ref("");
    let message = ref("");
    onMounted(() => {
      api
        .get("/alluser")
        .then((response) => {
          users.value = response.data;
          console.log(users.value);
        })
        .catch((error) => {
          console.error(error);
        });
    });
    function addAccount() {
      console.log(
        newFirstName.value +
          "and" +
          newLastName.value +
          "and" +
          newUserName.value +
          "and" +
          role.value
      );
      api
        .post("/addaccount", {
          username: newUserName.value,
          firstname: newFirstName.value,
          lastname: newLastName.value,
          password: newPassword.value,
          email: newEmail.value,
          role: role.value,
        })
        .then((response) => {
          console.log(response.data);
          this.message = response.data.message;
        })
        .catch((error) => {
          console.log(error);
        });
    }
    function formatDate(date) {
      let dateObj = new Date(date);
      const year = dateObj.getFullYear();
      const month = dateObj.getMonth() + 1;
      const day = dateObj.getDate();
      return `${year}-${month}-${day}`;
    }
    function getRole(role) {
      return role === 1 ? "admin" : "user";
    }
    function deleteAccount(id) {
      let text = "Are you sure";
      if (confirm(text) == true) {
        location.reload();
        api
          .delete("/deleteaccount/" + id)
          .then((response) => {
            console.log(response.data);
            location.reload();
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log("cancelled");
      }
    }
    function changeRole(id) {
      let text = "Are you sure";
      if (confirm(text) == true) {
        location.reload();

        api
          .put("/changerole/" + id)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log("cancelled");
      }
    }
    return {
      users,
      role,
      newEmail,
      newUserName,
      newPassword,
      newFirstName,
      newLastName,
      addAccount,
      dateJoined,
      formatDate,
      getRole,
      changeRole,
      deleteAccount,
      message,
    };
  },
};
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
.register-form {
  margin: auto;
  padding: auto;
  border-radius: 2rem;
  width: 30%;
  display: flex;
  flex-direction: column;
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
/* .register-button {
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
} */
.errorBox {
  color: red;
  width: 22rem;
  margin: auto;
  padding: auto;
  display: flex;
  flex-direction: column;
  align-items: start;
}
.user-table {
  width: 100%;
}
</style>
