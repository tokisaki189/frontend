<template>
  <div class="container">
    <div class="button-tab-container">
      <button @click="getAll()" class="tab">All</button>
      <button @click="getPending()" class="tab">Pending</button>
      <button @click="getApproved()" class="tab">Approved</button>
      <button @click="getDenied()" class="tab">Denied</button>
    </div>
    <table class="order">
      <tr>
        <th>Order ID</th>
        <th>Flight ID</th>
        <th>Plane</th>
        <th>Normal Seat Ordered</th>
        <th>Business Seat Ordered</th>
        <th>Total Pay</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
      <tr v-for="order in orders" :key="order">
        <td>{{ order.order_id }}</td>
        <td>{{ order.flight_id }}</td>
        <td>{{ order.planes }}</td>
        <td>{{ order.normal_seat_order }}</td>
        <td>{{ order.business_seat_order }}</td>
        <td>{{ order.total_price }}</td>
        <td>{{ order.approved }}</td>
        <td>
          <button
            :id="order.order_id"
            v-if="order.approved === 'Pending'"
            @click="
              approve(
                order.order_id,
                order.user_id,
                order.flight_id,
                order.normal_seat_order,
                order.business_seat_order
              )
            "
            class="approve"
          >
            Approve
          </button>
          <button
            v-if="order.approved === 'Pending'"
            :id="order.order_id"
            @click="deny(order.order_id, order.user_id)"
            class="deny"
          >
            Deny
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
import { onMounted } from "vue";
import api from "../../api";
import { ref } from "vue";
export default {
  name: "FlightApproval",
  setup() {
    let orders = ref("");
    let reversedOrder = ref("");
    onMounted(() => {
      api
        .get("/orderlist")
        .then((response) => {
          orders.value = response.data;
          console.log(orders.value);
        })
        .catch((error) => {
          console.error(error);
        });
    });
    function approve(
      order_id,
      user_id,
      flight_id,
      normal_seat_order,
      business_seat_order
    ) {
      api.put("/approve/" + order_id, {
        orderId: order_id,
        userId: user_id,
        flightId: flight_id,
        normalSeat: normal_seat_order,
        businessSeat: business_seat_order,
      });
    }
    function deny(order_id, user_id) {
      console.log("oder id" + order_id + " user_id" + user_id);
      api.put("/deny/" + order_id, {
        orderId: order_id,
        userId: user_id,
      });
    }
    function getAll() {
      api
        .get("/orderlist")
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
        .get("/pending")
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
        .get("/approved")
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
        .get("/denied")
        .then((response) => {
          orders.value = response.data;
          console.log(orders.value);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    return {
      orders,
      approve,
      deny,
      getAll,
      getPending,
      getApproved,
      getDenied,
      reversedOrder,
    };
  },
};
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
.order {
}
th,
td {
  vertical-align: top;
  border: 1px solid black;
  width: 100px;
}
tr {
  vertical-align: top;
}
tr:nth-child(even) {
  background-color: #d6d6d6;
}
table {
  width: 100%;
  border-spacing: 3px;
  height: 40rem;
}
button {
  width: 50%;
  height: 100%;
  border: none;
}
.approve {
  background-color: greenyellow;
}
.deny {
  background-color: red;
}
.button-tab-container {
  display: flex;
  flex-direction: row;
}
.tab {
  height: 2rem;
}
</style>
