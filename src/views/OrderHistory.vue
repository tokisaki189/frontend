<template>
  <div class="container">
    <nav>
      <a @click="getAll()" class="tab">All</a>
      <a @click="getPending()" class="tab">Pending</a>
      <a @click="getApproved()" class="tab">Approved</a>
      <a @click="getDenied()" class="tab">Denied</a>
    </nav>
    <table class="order">
      <tr>
        <th>Plane</th>
        <th>Normal Seat Ordered</th>
        <th>Business Seat Ordered</th>
        <th>Total Pay</th>
        <th>Status</th>
        <th>Operation</th>
      </tr>
      <tr v-for="order in orders" :key="order">
        <td>{{ order.planes }}</td>
        <td>{{ order.normal_seat_order }}</td>
        <td>{{ order.business_seat_order }}</td>
        <td>{{ order.total_price }}</td>
        <td>{{ order.approved }}</td>
        <td>
          <button
            v-if="order.approved === 'Pending'"
            @click="goToEdit(order.order_id)"
          >
            Edit
          </button>
          <button
            v-if="order.approved === 'Pending'"
            @click="deleteOrder(order.order_id)"
          >
            Delete
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
import api from "../api";
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import router from "../router";

export default {
  name: "FlightApproval",
  setup() {
    let store = useStore();
    let user = ref("");
    let userId = ref();
    let orders = ref("");
    onMounted(() => {
      userId.value = store.state.userID;
      console.log(store.state.userID);
      api
        .get("/myorder/" + userId.value)
        .then((response) => {
          orders.value = response.data;
          console.log(orders.value);
        })
        .catch((error) => {
          console.log(error);
        });
    });
    function getAll() {
      api
        .get("/orderlist/" + userId.value)
        .then((response) => {
          orders.value = response.data;
          console.log(orders.value);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    function getPending() {
      api
        .get("/pending/" + userId.value)
        .then((response) => {
          orders.value = response.data;
          console.log(orders.value);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    function getApproved() {
      api
        .get("/approved/" + userId.value)
        .then((response) => {
          orders.value = response.data;
          console.log(orders.value);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    function getDenied() {
      api
        .get("/denied/" + userId.value)
        .then((response) => {
          orders.value = response.data;
          console.log(orders.value);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    function goToEdit(orderId) {
      console.log(orderId);
      router.push({
        name: "edit",
        query: {
          id: orderId,
        },
      });
    }

    function deleteOrder(id) {
      api
        .get("/deleteOrder/" + id)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    return {
      orders,
      user,
      userId,
      getApproved,
      getDenied,
      getPending,
      getAll,
      goToEdit,
      deleteOrder,
    };
  },
};
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  margin-top: 10rem;
}
nav {
  margin: 27px auto 0;

  position: relative;
  width: 590px;
  height: 50px;
  background-color: #34495e;
  border-radius: 8px;
  font-size: 0;
}
nav a {
  line-height: 50px;
  height: 100%;
  font-size: 15px;
  display: inline-block;
  position: relative;
  z-index: 1;
  text-decoration: none;
  text-transform: uppercase;
  text-align: center;
  color: white;
  cursor: pointer;
}
nav .animation {
  position: absolute;
  height: 100%;
  top: 0;
  z-index: 0;
  transition: all 0.5s ease 0s;
  border-radius: 8px;
}
a:nth-child(1) {
  width: 100px;
}
a:nth-child(2) {
  width: 110px;
}
a:nth-child(3) {
  width: 100px;
}
a:nth-child(4) {
  width: 160px;
}
a:nth-child(5) {
  width: 120px;
}
nav .start-home,
a:nth-child(1):hover ~ .animation {
  width: 100px;
  left: 0;
  background-color: #1abc9c;
}
nav .start-about,
a:nth-child(2):hover ~ .animation {
  width: 110px;
  left: 100px;
  background-color: #e74c3c;
}
nav .start-blog,
a:nth-child(3):hover ~ .animation {
  width: 100px;
  left: 210px;
  background-color: #3498db;
}
nav .start-portefolio,
a:nth-child(4):hover ~ .animation {
  width: 160px;
  left: 310px;
  background-color: #9b59b6;
}
nav .start-contact,
a:nth-child(5):hover ~ .animation {
  width: 120px;
  left: 470px;
  background-color: #e67e22;
}

body {
  font-size: 12px;
  font-family: sans-serif;
  background: #2c3e50;
}
h1 {
  text-align: center;
  margin: 40px 0 40px;
  text-align: center;
  font-size: 30px;
  color: #ecf0f1;
  text-shadow: 2px 2px 4px #000000;
  font-family: "Cherry Swash", cursive;
}
.container {
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 10px;
  padding-right: 10px;
}

.order {
  width: 100%;
  margin-top: 20px;
  font-family: "lato", sans-serif;
}

.order th {
  background-color: #95a5a6;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  padding: 25px 30px;
}

.order td {
  background-color: #ffffff;
  box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
  padding: 25px 30px;
}

.order tr:hover {
  background-color: #f8f8f8;
}

.order td:nth-child(1),
.order td:nth-child(2) {
  width: 10%;
}

.order td:nth-child(3) {
  width: 40%;
}

.order td:nth-child(4),
.order td:nth-child(5),
.order td:nth-child(6) {
  width: 25%;
}

@media all and (max-width: 767px) {
  .order th {
    display: none;
  }

  .order tr {
    display: block;
    margin-bottom: 20px;
    border-radius: 3px;
  }

  .order td {
    display: flex;
    padding: 10px 0;
  }

  .order td:before {
    color: #6c7a89;
    padding-right: 10px;
    content: attr(data-label);
    flex-basis: 50%;
    text-align: right;
  }
}
</style>
